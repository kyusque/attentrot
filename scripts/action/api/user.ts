import {AuthenticationFailed} from './_errors';
import {User, safeUser} from '../../common/users';

export {AuthenticationFailed} from './_errors';

export const GET_USER = 'GET /user';
export const GET_USER_SUCCESS = 'GET /user success';

export interface GetUser {type: typeof GET_USER}
export interface GetUserSuccess {type: typeof GET_USER_SUCCESS, user: User}

export const GetUser: GetUser = {type: GET_USER}

export function GetUserSuccess(user: User): GetUserSuccess {
    return {type: GET_USER_SUCCESS, user: safeUser(user)}
}

export type UserAction = GetUser | GetUserSuccess | AuthenticationFailed

