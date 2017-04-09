import {UsersAction} from './api/users';
import {RawError} from './api/_errors';
import {QRCodeIssueAction} from './api/qrcode/issue';
import {QRCodeVerifyAction} from './api/qrcode/verify';

import {SelectUser} from './parts/select-user';
import {SetPassword} from './parts/set-password';

export * from './parts/set-password';
export * from './parts/select-user';
export * from './api/users';
export * from './api/qrcode/issue';
export * from './api/qrcode/verify';
export {DATABASE_ERROR, DatabaseError, RAW_ERROR, RawError, NO_SUCH_USER_ID, NoSuchUserID} from './api/_errors';

export type Action
    = UsersAction
    | QRCodeIssueAction
    | QRCodeVerifyAction

    | SelectUser
    | SetPassword
    | RawError;

export interface Dispatcher {
    dispatch(a: Action): void
}
