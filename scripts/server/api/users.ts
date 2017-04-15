import express from 'express';

import {User} from '../../common/users';

import {table, default as knex} from '../database';

import {GetUsersSuccess, GetUsersTarget} from '../../action/api/users';
import {DatabaseError} from '../../action/api/_errors';

const users: Express.Application = express()

.get('', async (req, res) => {
    const target: GetUsersTarget | undefined = req.query.target;
    const query = knex.select().from(table.users);

    switch (target) {
        case 'verified':
        case 'nonverified':
            query.where('verified', '=', target === 'verified')
    }

    try {
        const users: User[] = await query;
        res.send(GetUsersSuccess(users));
    } catch (e) {
        res.status(500).send(DatabaseError(e.toString()))
    }
})

export default users;
