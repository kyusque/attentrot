import express from 'express';

import * as speakeasy from 'speakeasy';

import {table, default as knex} from '../../database';

import {PostQRCodeVerifySuccess, QRCodeVerifyFailure} from '../../../action/api/qrcode/verify';
import {DatabaseError, NoSuchUserID} from '../../../action/api/_errors';


const qrcode_verify: Express.Application = express()

.post('', async (req, res) => {
    const id = parseInt(req.body.id);
    const code = req.body.password;

    try {
        knex.transaction(async trx => {
            const user = await knex.transacting(trx).first('secret').from(table.users).where('id', '=', id);
            if (!user) {
                res.status(401).send(NoSuchUserID(id));
                return;
            }
            const ok = (speakeasy.totp as any).verify({ secret: user.secret, encoding: 'base32', token: code });

            if (ok) {
                await knex(table.users).transacting(trx).update({ verified: true }).where('id', '=', id);
                res.send(PostQRCodeVerifySuccess(id));
            } else {
                res.status(400).send(QRCodeVerifyFailure(id));
            }
        })
    } catch (e) {
        res.status(500).send(DatabaseError(e.toString()));
    }
})

export default qrcode_verify;
