import {State, initialState} from '../state/new';
import {exhaustive} from '../utils';

import * as A from '../action/new';

export default function newReducer(state: State = initialState, action: A.Action): State {
    switch (action.type) {
        case A.GET_USERS:
            return state;
        case A.GET_USERS_SUCCESS:
            return {...state, users: action.users};

        case A.POST_QRCODE_ISSUE:
            return {...state, qrcode: null};
        case A.POST_QRCODE_ISSUE_SUCCESS:
            return {...state, qrcode: action.image}

        case A.SELECT_USER:
            return {...state, id: action.id, qrcode: null};
        case A.SET_PASSWORD:
            return {...state, password: action.password};

        case A.POST_QRCODE_VERIFY:
            return state;
        case A.POST_QRCODE_VERIFY_SUCCESS:
            return {...state, phase: action, qrcode: null}

        case A.DATABASE_ERROR:
        case A.ALREADY_VERIFIED:
        case A.GENERATION_FAILED:
        case A.QRCODE_VERIFY_FAILURE:
        case A.RAW_ERROR:
        case A.NO_SUCH_USER_ID:
            return {...state, phase: action}

        default:
            exhaustive(action);
            return state;
    }
}
