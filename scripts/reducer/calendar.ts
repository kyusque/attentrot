import {State, initialState} from '../state/calendar';
import * as A from '../action/calendar';

import exhaustive from '../common/exhaustive';
import {fromDateStamp} from '../common/stamp';


export default function loginReducer(state: State = initialState, action: A.Action): State {
    switch (action.type) {
        case A.SET_LOGIN_TOKEN:
            return {...state, login: action.login}

        case A.GET_USER:
            return state;

        case A.GET_USER_SUCCESS:
            return {...state, user: action.user}

        case A.GET_CALENDAR:
            return state;
        case A.GET_CALENDAR_SUCCESS:
            const attendances: Date[] = [];
            const notAttendances: Date[] = [];
            action.calendar.forEach(a => {
                const date = fromDateStamp(a.date);
                if (a.workTime >= action.threshold) {
                    attendances.push(date);
                } else {
                    notAttendances.push(date);
                }
            })
            return { ...state, attendances, notAttendances, yearStart: action.yearStart}

        case A.AUTHENTICATION_FAILED:
        case A.RAW_ERROR:
        case A.DATABASE_ERROR:
            return {...state};

        default:
            exhaustive(action);
            return state;
    }
}
