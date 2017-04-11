import * as cookie from 'js-cookie';

import {put, call, takeLatest, select, fork}  from 'redux-saga/effects';
import * as A from '../action/calendar';
import {State} from '../state/calendar';
import {User} from '../state/parts/users';
import * as api from '../api';
import userSaga from './parts/user';

function* getCalendar() {
    try {
        const user: User|null = yield select<State>(s => s.user);
        if (!user) {
            return;
        }
        yield put(yield call(api.getCalendar, {ids: user.id}));
    } catch (e) {
        yield put(A.RawError(e.toString()));
    }
}

export default function* saga(): IterableIterator<any> {
    yield fork(userSaga);
    yield fork(takeLatest, A.GET_USER_SUCCESS, getCalendar);

    yield put(A.SetLoginToken(cookie.get('login')));
    yield fork(put, A.GetUser);
}
