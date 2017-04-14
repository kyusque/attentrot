import express from 'express';

import {Transaction} from 'knex';
import {table, default as knex} from '../database';
import {User} from '../../state/parts/users';
import {requireAuthAPI, todayRange} from '../auth';
import { DatabaseError } from '../../action/api/_errors';
import {CLOCK_IN, CLOCK_OUT, BREAK_START, BREAK_END, AttendanceEventType}  from '../../action/api/record';
import {ATTENDANCE_YET, ATTENDANCE_WORKING, ATTENDANCE_BREAK, ATTENDANCE_LEAVE}  from '../../action/api/status';
import {AttendancePhase, GetStatusSuccess}  from '../../action/api/status';

export interface AttendanceEvent {
    event: AttendanceEventType;
    at: number
}

export function toAttendancePhase(events: Array<AttendanceEvent>): AttendancePhase {
    const clockIn = events[0];

    if (clockIn === undefined) {
        return {type: ATTENDANCE_YET};
    }

    let workTime = 0;
    let currentWorkStart = 0;
    events.forEach((event: any) => {
        if (event.event === CLOCK_IN || event.event === BREAK_END) {
            currentWorkStart = event.at;
        } else { // CLOCK_OUT, BREAK_START
            workTime += event.at - currentWorkStart;
        }
    });

    const lastEvent = events[events.length - 1];
    switch (lastEvent.event) {
        case BREAK_START:
            return { type: ATTENDANCE_BREAK, clockIn: clockIn.at, eventStart: lastEvent.at, workTime}
        case CLOCK_OUT:
            return { type: ATTENDANCE_LEAVE, clockIn: clockIn.at, eventStart: lastEvent.at, workTime}
        default:
            return { type: ATTENDANCE_WORKING, clockIn: clockIn.at, eventStart: lastEvent.at, workTime};
    }
}

export async function getAttendanceEvents(id: number, range: [number, number], tsx?: Transaction): Promise<Array<AttendanceEvent>> {
    const today = knex(table.attendance_events).select(['event', 'at']).where('userId', '=', id).whereBetween('at', range).orderBy('at');
    if (tsx) {
        today.transacting(tsx);
    }
    return await today;
}

const status: Express.Application = express()

.get('', requireAuthAPI, async (_req, res) => {
    try {
        const user: User = res.locals.login;
        res.send(GetStatusSuccess(toAttendancePhase(await getAttendanceEvents(user.id, todayRange()))));
    } catch (e) {
        res.send(DatabaseError(e.toString()));
    }
})

export default status;
