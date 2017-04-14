import {put, call, takeLatest, select, fork}  from 'redux-saga/effects';
import * as cookie from 'js-cookie';

import userSaga from './parts/user';

import * as api from '../api';

import * as A from '../action/calendar';
import {SetLoginToken} from '../action/parts/set-login';
import {GetUser} from '../action/api/user';
import {RawError} from '../action/api/_errors';

import {State} from '../state/calendar';

import {User} from '../common/users';

function* getCalendar() {
    try {
        const user: User|null = yield select<State>(s => s.user);
        if (!user) {
            return;
        }
        yield put(yield call(api.getCalendar, {ids: user.id}));
    } catch (e) {
        yield put(RawError(e.toString()));
    }
}

export default function* saga(): IterableIterator<any> {
    yield fork(userSaga);
    yield fork(takeLatest, A.GET_USER_SUCCESS, getCalendar);

    yield put(SetLoginToken(cookie.get('login')));
    yield fork(put, GetUser);
}
