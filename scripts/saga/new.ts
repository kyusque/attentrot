import {call, put, fork, takeLatest}  from 'redux-saga/effects';

import {GetUsers} from '../action/api/users';

import userSaga from './parts/users';

import * as api from '../api';

import * as A from '../action/new';
import {RawError} from '../action/api/_errors'

function* issueQRCode({id}: A.PostQRCodeIssue) {
    try {
        yield put(yield call(api.issueQRCode, id));
    } catch (e) {
        yield put(RawError(e.toString()));
    }
}

function* verifyQRCode(action: A.PostQRCodeVerify) {
    try {
        yield put(yield call(api.verifyQRCode, action));
    } catch (e) {
        yield put(RawError(e.toString()));
    }
}

export default function* newSaga(): IterableIterator<any> {
    yield fork(userSaga, "nonverified");
    yield fork(takeLatest, A.POST_QRCODE_ISSUE, issueQRCode);
    yield fork(takeLatest, A.POST_QRCODE_VERIFY, verifyQRCode);
    yield fork(takeLatest, A.POST_QRCODE_VERIFY_SUCCESS, () => put(GetUsers("nonverified")));
}
