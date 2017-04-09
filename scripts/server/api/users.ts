import express from 'express';

import knex from '../knex';

import {User} from '../../state/parts/users';
import * as table from '../table-names';

import {GetUsersSuccess, GetUsersTarget} from '../../action/api/users';
import {DatabaseError} from '../../action/api/_errors';

const users: Express.Application = express()

.get('', async (req, res) => {
    const target: GetUsersTarget | undefined = req.query.target;
    const query = knex.select(['id', 'name', 'verified', 'authType', 'admin', 'active']).from(table.USERS);

    switch (target) {
        case 'verified':
        case 'nonverified':
            query.where('verified', '=', target === 'verified')
    }

    try {
        const users: Array<User> = await query;
        res.send(GetUsersSuccess(users));
    } catch (e) {
        res.status(500).send(DatabaseError(e.toString()))
    }
})

export default users;
