import {RawError, DatabaseError} from './api/_errors';
import {SetLoginToken} from './parts/set-login';
import {UserAction} from './api/user';
import {CalendarAction} from './api/calendar';

export * from './api/user';
export {RAW_ERROR, RawError, DATABASE_ERROR, AUTHENTICATION_FAILED} from './api/_errors';
export {SET_LOGIN_TOKEN, SetLoginToken} from './parts/set-login'
export {GET_CALENDAR, GET_CALENDAR_SUCCESS} from './api/calendar'

export type Action
    = UserAction
    | CalendarAction
    | RawError
    | SetLoginToken
    | DatabaseError;

export interface Dispatcher {
    dispatch(a: Action): void
}

