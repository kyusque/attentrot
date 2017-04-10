import express from 'express';
import qrcode from 'qrcode';

import * as speakeasy from 'speakeasy';

import knex from '../../knex';

import * as table from '../../table-names';

import {AlreadyVerified, GenerationFailed, PostQRCodeIssueSuccess} from '../../../action/api/qrcode/issue';
import {DatabaseError} from '../../../action/api/_errors';

import config from '../../config';


const qrcode_issue: Express.Application = express()

.post('', async (req, res) => {
    const id = parseInt(req.body.id);
    const secret = speakeasy.generateSecret({}).base32;

    try {
        const cont = await knex(table.USERS).update({ secret: secret }).where('id', '=', id).where('verified', '=', false);
        if (!cont) {
            res.status(400).send(AlreadyVerified(id));
            return;
        }
    } catch (e) {
        res.status(500).send(DatabaseError(e.toString()));
        return;
    }

    const url = `otpauth://totp/${encodeURIComponent(config.otpName)}?secret=${secret}`;
    qrcode.toDataURL(url, (err, data) => {
        if (err) {
            res.status(500).send(GenerationFailed(err.toString()))
        } else {
            res.send(PostQRCodeIssueSuccess(data));
        }
    });
})

export default qrcode_issue;
