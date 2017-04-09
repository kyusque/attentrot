import {UsersAction} from './api/users';
import {LoginAction} from './api/login';
import {SelectUser} from './parts/select-user';
import {SetPassword} from './parts/set-password';
import {RawError, NoSuchUserID} from './api/_errors';

export * from './parts/set-password';
export * from './parts/select-user';
export * from './api/users';
export * from './api/login';
export {DATABASE_ERROR, DatabaseError, AUTHENTICATION_FAILED, AuthenticationFailed, RAW_ERROR, RawError, NO_SUCH_USER_ID, NoSuchUserID} from './api/_errors';

export type Action
    = UsersAction
    | LoginAction

    | SelectUser
    | SetPassword

    | NoSuchUserID
    | RawError;

export interface Dispatcher {
    dispatch(a: Action): void
}
