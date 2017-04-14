import express from 'express';

import {getAttendanceEvents, toAttendancePhase} from './status';

import {requireAuthAPI, todayRange} from '../auth';
import {toDateStamp} from '../../common/stamp';

import {table, default as knex} from '../database';

import {isAcceptableEvent, PostRecordSuccess, NotAcceptableEvent} from '../../action/api/record';
import {ATTENDANCE_LEAVE} from '../../action/api/status';
import { DatabaseError } from '../../action/api/_errors';

const record: Express.Application = express()

.post('', requireAuthAPI, async (req, res) => {
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const userId = res.locals.login.id;
    const event = req.body.event;

    const range = todayRange();

    try {
        await knex.transaction(async trx => {
            const events = await getAttendanceEvents(userId, range, trx);
            const phase = toAttendancePhase(events);

            if (!isAcceptableEvent(phase.type, event)) {
                res.send(NotAcceptableEvent({ current: phase.type, next: event || null }));
                return;
            }
            await knex(table.attendance_events).transacting(trx).insert({ userId, event, ip, at: Date.now() });
            const [newEvent] = await knex(table.attendance_events).transacting(trx).select(['at', 'event']).whereRaw('ROWID = last_insert_rowid()');
            events.push(newEvent);
            const newPhase = toAttendancePhase(events);
            if (newPhase.type === ATTENDANCE_LEAVE) {
                const date = new Date(range[0]);
                const stamp = toDateStamp(date);
                const current = await knex(table.attendance).transacting(trx).first('userId').where('userId', '=', userId).where('date', '=', stamp);
                if (!current) {
                    await knex(table.attendance).transacting(trx).insert({userId, date: stamp, workTime: newPhase.workTime});
                } else {
                    await knex(table.attendance).transacting(trx).update({workTime: newPhase.workTime}).where('userId', '=', userId).where('date', '=', stamp);
                }
            }
            res.send(PostRecordSuccess(newPhase));
        });
    } catch (e) {
        res.send(DatabaseError(e.toString()));
    }
});

export default record;
