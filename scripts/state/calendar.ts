import {User} from '../common/users';

export {User} from '../common/users';

export interface State {
    user: User | null;
    login: string;
    attendances: Date[];
    notAttendances: Date[];
    yearStart: number|null;
}

export const initialState: State = {
    user: null,
    login: '',
    attendances: [],
    notAttendances: [],
    yearStart: null,
}
