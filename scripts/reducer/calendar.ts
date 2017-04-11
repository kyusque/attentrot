import {State, initialState} from '../state/calendar';
import {exhaustive} from '../utils';

import * as A from '../action/calendar';

export default function loginReducer(state: State = initialState, action: A.Action): State {
    switch (action.type) {
        case A.SET_LOGIN_TOKEN:
            return {...state, login: action.login}

        case A.GET_USER:
            return state;

        case A.GET_USER_SUCCESS:
            return {...state, user: action.user}

        case A.AUTHENTICATION_FAILED:
        case A.RAW_ERROR:
        case A.DATABASE_ERROR:
            return {...state};

        default:
            exhaustive(action);
            return state;
    }
}
