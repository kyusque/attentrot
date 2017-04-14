import {User} from '../common/users';
import * as A from '../action/new';

export {User} from '../common/users';

export type Phase
    = A.DatabaseError
    | A.PostQRCodeVerifyFailure
    | A.PostQRCodeIssueFailure
    | A.GenerationFailed
    | A.PostQRCodeVerifySuccess
    | A.RawError
    | { type: null}

export interface State {
    id: number;
    users: Array<User>;
    qrcode: string | null;
    password: string;
    phase: Phase;
}

export const initialState: State = {
    id: 0,
    users: [],
    qrcode: null,
    password: '',
    phase: {type: null},
}
