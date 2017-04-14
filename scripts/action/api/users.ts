import {User, safeUser} from '../../common/users';
import * as api from './_errors';

export type GetUsersTarget = 'all' | 'verified' | 'nonverified';

export const GET_USERS = 'GET /users'
export const GET_USERS_SUCCESS = 'GET /users success'

export type GetUsers = {type: typeof GET_USERS, target: GetUsersTarget}
export type GetUsersSuccess = {type: typeof GET_USERS_SUCCESS, users: Array<User>}

export function GetUsers(target: GetUsersTarget): GetUsers {
    return {type: GET_USERS, target}
}

export function GetUsersSuccess(users: Array<User>): GetUsersSuccess {
    return {type: GET_USERS_SUCCESS, users: users.map(u => safeUser(u))};
}

export type GetFailure = api.DatabaseError;

export type UsersAction
    = GetUsers | GetUsersSuccess | GetFailure
