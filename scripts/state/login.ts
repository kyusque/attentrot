import {User} from './parts/users';
import * as A from '../action/login';

export type Phase
    = A.AuthenticationFailed
    | A.DatabaseError
    | A.RawError
    | A.NoSuchUserID
    | { type: null };

export interface State {
    users: Array<User>;
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
