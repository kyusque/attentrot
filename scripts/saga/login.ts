import {put, fork, call, takeLatest}  from 'redux-saga/effects';

import * as api from '../api';
import userSaga from './parts/users';
import * as A from '../action/login';
import {RawError} from '../action/api/_errors'

export function* login(action: A.PostLogin): IterableIterator<any> {
    try {
        yield put(yield call(api.login, action));
    } catch (e) {
        yield put(RawError(e.toString()));
    }
}

export function loginSuccess(_: A.PostLoginSuccess)  {
    location.pathname = '/'
}

export default function* saga(): IterableIterator<any> {
    yield fork(userSaga, "verified");
    yield fork(takeLatest, A.POST_LOGIN, login);
    yield fork(takeLatest, A.POST_LOGIN_SUCCESS, loginSuccess);
}
