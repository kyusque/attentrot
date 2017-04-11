import {call, fork, takeLatest, put}  from 'redux-saga/effects';

import {RawError} from '../../action/api/_errors';
import {SelectUser, SELECT_USER} from '../../action/parts/select-user';
import {GET_USERS, GetUsers, GetUsersTarget, GetUsersSuccess, GET_USERS_SUCCESS} from '../../action/api/users';

import * as api from '../../api';

export function* getUsers({target}: GetUsers): IterableIterator<any> {
    try {
        yield put(yield call(api.getUsers, target));
    } catch (e) {
        yield put(RawError(e.toString()));
    }
}

export function* handleGetUsersSuccess({users}: GetUsersSuccess): IterableIterator<any> {
    const sUserId = window.localStorage.getItem('userId');
    if (sUserId) {
        const userId = JSON.parse(sUserId);

        for (let i in users) {
            const user = users[i];
            if (user.id === userId) {
                yield put(SelectUser(userId));
                return;
            }
        }
    }

    if (users.length > 0) {
        yield put(SelectUser(users[0].id));
    }
}

export function* handleSelectUser({id}: SelectUser): IterableIterator<any> {
    window.localStorage.setItem('userId', JSON.stringify(id));
}

export default function* usersSaga(target: GetUsersTarget): IterableIterator<any> {
    yield fork(takeLatest, GET_USERS, getUsers);
    yield fork(takeLatest, SELECT_USER, handleSelectUser)
    yield fork(takeLatest, GET_USERS_SUCCESS, handleGetUsersSuccess);

    yield fork(put, GetUsers(target));
}
