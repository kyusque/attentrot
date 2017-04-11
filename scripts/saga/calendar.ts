import * as cookie from 'js-cookie';

import {put, fork}  from 'redux-saga/effects';
import * as A from '../action/record';

import userSaga from './parts/user';

export default function* saga(): IterableIterator<any> {
    yield fork(userSaga);

    yield put(A.SetLoginToken(cookie.get('login')));
    yield fork(put, A.GetUser);
}
