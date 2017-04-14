import express from 'express';
import * as speakeasy from 'speakeasy';

import {safeUser} from '../../common/users';
import {signUser} from '../auth';

import {table, default as knex} from '../database';

import {PostLoginSuccess} from '../../action/api/login';
import { DatabaseError, AuthenticationFailed, NoSuchUserID } from '../../action/api/_errors';


function checkAuth({type, secret, password}: {type: 'totp' | 'none', secret: string, password: number}): boolean {
    if (type === 'none') {
        return true;
    }

    return (speakeasy.totp as any).verify({secret, encoding: 'base32', token: password});
}

const login: Express.Application = express()

.post('', async (req, res) => {
    const id = parseInt(req.body.id);
    const password = parseInt(req.body.password);

    let user;
    try {
        user = await knex.first().from(table.users).where('id', '=', id);
        if (!user) {
            res.status(401).send(NoSuchUserID(id));
            return;
        }
    } catch (e) {
        res.status(500).send(DatabaseError(e.toString()));
    }

    if (!checkAuth({ type: user.authType, secret: user.secret, password })) {
        res.status(401).send(AuthenticationFailed);
        return;
    }

    const login = await signUser(safeUser(user));
    res.cookie('login', login, {path: '/'})
    res.send(PostLoginSuccess({user, login}));
})

export default login;
