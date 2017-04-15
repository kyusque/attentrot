import {User} from '../common/users';
import * as A from '../action/login';

export {User} from '../common/users';


export type Phase
    = A.AuthenticationFailed
    | A.DatabaseError
    | A.RawError
    | A.NoSuchUserID
    | { type: null };

export interface State {
    users: User[];
    id: number;
    phase: Phase,
    password: string;
}

export const initialState: State = {
    users: [],
    id: 0,
    phase: {type: null},
    password: '',
}
