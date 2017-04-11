import {RawError, DatabaseError} from './api/_errors';
import {SetLoginToken} from './parts/set-login';
import {UserAction} from './api/user';

export * from './api/user';
export {RAW_ERROR, DATABASE_ERROR, AUTHENTICATION_FAILED} from './api/_errors';
export {SET_LOGIN_TOKEN, SetLoginToken} from './parts/set-login'

export type Action
    = UserAction
    | RawError
    | SetLoginToken
    | DatabaseError;

export interface Dispatcher {
    dispatch(a: Action): void
}

