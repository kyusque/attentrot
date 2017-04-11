import {State, initialState} from '../state/record';
import {AttendancePhase, ATTENDANCE_YET, ATTENDANCE_WORKING} from '../action/record';
import {exhaustive} from '../utils';

import * as A from '../action/record';

function toWorkTime({now, attendance}: {now: number, attendance: AttendancePhase}): [number, number, number] | null {
        if (attendance.type == ATTENDANCE_YET) {
            return null;
       }

        let time = attendance.workTime;
        if (attendance.type === ATTENDANCE_WORKING) {
            time += now - attendance.eventStart;
        }

        if (time < 0) {
            return null;
        }

        const hours = Math.floor(time/3600000);
        time -= hours * 3600000;
        const minutes = Math.floor(time/60000);
        time -= minutes * 60000;
        const seconds = Math.floor(time/1000);

        return [hours, minutes, seconds];
}

export default function recordReducer(state: State = initialState, action: A.Action): State {
    switch (action.type) {
        case A.GET_STATUS:
            return state;
        case A.GET_STATUS_SUCCESS:
            return {...state, attendance: action.attendance, phase: {type: null}}

        case A.GET_USER:
            return state;
        case A.GET_USER_SUCCESS:
            return {...state, user: action.user};

        case A.POST_RECORD:
            return state;

        case A.POST_RECORD_SUCCESS:
            return {...state, attendance: action.attendance, phase: {type: null}};

        case A.TOGGLE_BREAK:
            return state;

        case A.DATABASE_ERROR:
        case A.NOT_ACCEPTABLE_EVENT:
        case A.RAW_ERROR:
        case A.AUTHENTICATION_FAILED:
            return {...state, phase: action};

        case A.SET_LOGIN_TOKEN:
            return {...state, login: action.login}

        case A.UPDATE_CLOCK:
            const workTime = toWorkTime({now: action.now, attendance: state.attendance});
            return {...state, now: action.now, workTime}

        default:
            exhaustive(action);
            return state;
    }
}
