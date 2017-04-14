import express from 'express';
import {table, default as knex} from '../database';
import {toDateStamp} from './stamp';

import config from '../config';

import {GetCalendarSuccess} from '../../action/api/calendar';
import {DatabaseError} from '../../action/api/_errors';

const DAY_MS = 24 * 60 * 60 * 1000;

const user: Express.Application = express()

.get('', async (req, res) => {
    const rawIds = req.query.id;
    const intIds = (rawIds instanceof Array) ? rawIds.map((s: string) => parseInt(s)) : [parseInt(rawIds)];
    const ids = intIds.filter(v => Number.isInteger(v));

    const year: number = parseInt(req.query.year) || (new Date).getFullYear();
    const start = 10000 * year + 100 * config.yearStart + 1;
    const endDate = new Date(new Date(year + 1, config.yearStart, 1).getTime() - DAY_MS);
    const end = toDateStamp(endDate);
    const query = knex(table.attendance).select().whereBetween('date', [start, end]);
    if (ids.length > 0) {
        query.whereIn('userId', ids);
    }
    try {
        res.send(GetCalendarSuccess({calendar: await query, yearStart: config.yearStart, threshold: config.threshold}));
    } catch (e) {
        res.status(500).send(DatabaseError(e.toString()));
    }
});

export default user;


