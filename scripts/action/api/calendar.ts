import {DatabaseError} from './_errors';
export {DATABASE_ERROR} from './_errors';

export const GET_CALENDAR = 'GET /calendar';
export const GET_CALENDAR_SUCCESS = 'GET /calendar success';

export interface DailyAttendance {
    userId: number;
    date: number;
    workTime: number;
}

export interface GetCalendar {type: typeof GET_CALENDAR, id: number}
export interface GetCalendarSuccess {type: typeof GET_CALENDAR_SUCCESS, calendar: DailyAttendance[], yearStart: number, threshold: number}

export function GetCalendar(id: number): GetCalendar {
    return {type: GET_CALENDAR, id}
}

export function GetCalendarSuccess({calendar, yearStart, threshold}: {calendar: DailyAttendance[], yearStart:number, threshold: number}): GetCalendarSuccess {
    return {type: GET_CALENDAR_SUCCESS, calendar, yearStart, threshold}
}

export type CalendarAction
    = GetCalendar | GetCalendarSuccess | DatabaseError
