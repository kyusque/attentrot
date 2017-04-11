import {User} from './parts/users';

export interface State {
    user: User | null;
    login: string;
}

export const initialState: State = {
    user: null,
    login: '',
}
