import {DatabaseError, RawError} from './api/_errors';
import {StatusAction} from './api/status';
import {RecordAction} from './api/record';
import {UserAction} from './api/user';
import {SetLoginToken} from './parts/set-login'

export * from './api/status';
export * from './api/record';
export * from './api/user';
export {DATABASE_ERROR, DatabaseError, RAW_ERROR, RawError, AUTHENTICATION_FAILED, AuthenticationFailed} from './api/_errors';
export {SET_LOGIN_TOKEN, SetLoginToken} from './parts/set-login'

export const TOGGLE_BREAK: 'TOGGLE_BREAK' = 'TOGGLE_BREAK';

export interface ToggleBreak {type: typeof TOGGLE_BREAK}

export const ToggleBreak = {type: TOGGLE_BREAK}

export type Action
    = StatusAction
    | UserAction
    | ToggleBreak
    | SetLoginToken
    | RecordAction
    | DatabaseError
    | RawError;


export interface Dispatcher {
    dispatch(a: Action): void
}
