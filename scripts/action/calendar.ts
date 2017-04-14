import {RawError, DatabaseError} from './api/_errors';
import {SetLoginToken} from './parts/set-login';
import {UserAction} from './api/user';
import {CalendarAction} from './api/calendar';

export * from './api/user';
export * from './api/_errors';
export * from './parts/set-login'
export {GET_CALENDAR, GetCalendar, GET_CALENDAR_SUCCESS, GetCalendarSuccess} from './api/calendar'

export type Action
    = UserAction
    | CalendarAction
    | RawError
    | SetLoginToken
    | DatabaseError;

export interface Dispatcher {
    dispatch(a: Action): void
}
