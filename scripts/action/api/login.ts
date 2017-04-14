import {DatabaseError, AuthenticationFailed, NoSuchUserID} from './_errors';
import {User, safeUser} from '../../common/users';

export const POST_LOGIN = 'POST /login';
export const POST_LOGIN_SUCCESS = 'POST /login success';

export interface PostLogin {type: typeof POST_LOGIN, id: number, password: number}
export interface PostLoginSuccess {type: typeof POST_LOGIN_SUCCESS, user: User, login: string}

export function PostLogin(args: {id: number, password: number}): PostLogin {
    return {type: POST_LOGIN, ...args};
}

export function PostLoginSuccess({user, login}: {user: User, login: string}): PostLoginSuccess {
    return {type: POST_LOGIN_SUCCESS, user: safeUser(user), login};
}

export type PostLoginFailure
    = DatabaseError
    | AuthenticationFailed
    | NoSuchUserID

export type LoginAction
    = PostLogin | PostLoginSuccess | PostLoginFailure
