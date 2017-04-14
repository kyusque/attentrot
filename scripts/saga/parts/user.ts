import {call, fork, select, takeLatest, put}  from 'redux-saga/effects';

import * as api from '../../api';

import {RawError} from '../../action/api/_errors';
import {GET_USER} from '../../action/api/user';


export function* getUser(): IterableIterator<any> {
    try {
        const login = yield select<{login: string}>(s => s.login);
        yield put(yield call(api.getUser, login));
    } catch (e) {
        yield put(RawError(e.toString()));
    }
}

export default function* userSaga(): IterableIterator<any> {
    yield fork(takeLatest, GET_USER, getUser);
}

