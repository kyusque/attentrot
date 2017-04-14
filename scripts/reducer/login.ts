import {State, initialState} from '../state/login';
import * as A from '../action/login';

import exhaustive from '../common/exhaustive';


export default function loginReducer(state: State = initialState, action: A.Action): State {
    switch (action.type) {
        case A.GET_USERS:
            return state;
        case A.GET_USERS_SUCCESS:
            return {...state, users: action.users};

        case A.SET_PASSWORD:
            return {...state, password: action.password};

        case A.SELECT_USER:
            return {...state, id: action.id};

        case A.POST_LOGIN:
        case A.POST_LOGIN_SUCCESS:
            return state;

        case A.AUTHENTICATION_FAILED:
        case A.DATABASE_ERROR:
        case A.RAW_ERROR:
        case A.NO_SUCH_USER_ID:
            return {...state, phase: action};

        default:
            exhaustive(action);
            return state;
    }
}
