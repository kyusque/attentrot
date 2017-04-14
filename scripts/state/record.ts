import {AttendancePhase, ATTENDANCE_YET} from '../action/api/status';
import {User} from '../common/users';
import * as A from '../action/record';

export {User} from '../common/users';

export type Phase
     = A.DatabaseError
     | A.NotAcceptableEvent
     | A.AuthenticationFailed
     | A.RawError
     | {type: null};

export interface State {
    user: User | null;
    attendance: AttendancePhase;
    phase: Phase;
    now: number;
    login: string;
    workTime: [number, number, number] | null;
}

export const initialState: State = {
    user: null,
    attendance: {type: ATTENDANCE_YET},
    phase: {type: null},
    now: 0,
    login: '',
    workTime: null,
}
