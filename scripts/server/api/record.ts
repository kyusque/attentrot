import express from 'express';

import {isAcceptableEvent}  from '../../action/api/record';
import knex from '../knex';
import {requireAuthAPI, todayRange} from '../auth';
import {getAttendanceEvents, toAttendancePhase} from './status';

import * as table from '../table-names';

import { PostRecordSuccess, NotAcceptableEvent} from '../../action/api/record';
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
            await knex(table.ATTENDANCE_EVENTS).transacting(trx).insert({ userId, event, ip, at: Date.now() });
            const [newEvent] = await knex(table.ATTENDANCE_EVENTS).transacting(trx).select(['at', 'event']).whereRaw('ROWID = last_insert_rowid()');
            events.push(newEvent);
            const newPhase = toAttendancePhase(events);
            if (newPhase.type === ATTENDANCE_LEAVE) {
                const date = new Date(range[0]);
                const stamp = 10000 * date.getFullYear() + 100 * date.getMonth() + date.getDate();
                const current = await knex(table.ATTENDANCE).transacting(trx).first('userId').where('userId', '=', userId).where('date', '=', stamp);
                if (!current) {
                    await knex(table.ATTENDANCE).transacting(trx).insert({userId, date: stamp, workTime: newPhase.workTime});
                } else {
                    await knex(table.ATTENDANCE).transacting(trx).update({workTime: newPhase.workTime}).where('userId', '=', userId).where('date', '=', stamp);
                }
            }
            res.send(PostRecordSuccess(newPhase));
        });
    } catch (e) {
        res.send(DatabaseError(e.toString()));
    }
});

export default record;
