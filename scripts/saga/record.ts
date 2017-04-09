import * as cookie from 'js-cookie';

import {State} from '../state/record';
import {call, put, fork, select, takeLatest}  from 'redux-saga/effects';
import {delay} from 'redux-saga';
import * as A from '../action/record';
import {ATTENDANCE_WORKING, ATTENDANCE_BREAK} from '../action/api/status';
import {PostRecord, UpdateClock, BREAK_START, BREAK_END} from '../action/api/record';

import * as api from '../api';

function* getStatus() {
    try {
        const login = yield select<State>(s => s.login);
        yield put(yield call(api.status, login));
    } catch (e) {
        yield put(A.RawError(e.toString()));
    }
}

function* postRecord(action: A.PostRecord) {
    try {
        const login = yield select<State>(s => s.login);
        yield put(yield call(api.record, { login, event: action.event }));
    } catch (e) {
        yield put(A.RawError(e.toString()));
    }
}

function* toggleBreak() {
    const current = yield select<State>(s => s.attendance.type);
    switch (current) {
        case ATTENDANCE_WORKING:
            yield put(PostRecord(BREAK_START));
            break;
        case ATTENDANCE_BREAK:
            yield put(PostRecord(BREAK_END));
            break;
    }
}

function* updateClock(ms: number) {
    while (true) {
        yield put(UpdateClock(Date.now()));
        yield call(delay, ms);
    }
}

function* syncServer(ms: number) {
    while (true) {
        yield put(A.GetStatus);
        yield call(delay, ms);
    }
}

export default function* recordSaga(): IterableIterator<any> {
    yield fork(takeLatest, A.GET_STATUS, getStatus);
    yield fork(takeLatest, A.POST_RECORD, postRecord);
    yield fork(takeLatest, A.TOGGLE_BREAK, toggleBreak);

    yield fork(put, A.SetLoginToken(cookie.get('login')));
    yield fork(put, A.GetStatus);
    yield fork(updateClock, 100);
    yield fork(syncServer, 10000);
}
