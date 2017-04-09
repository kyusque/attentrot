export const SET_LOGIN_TOKEN = 'SET_LOGIN_TOKEN';

export interface SetLoginToken {type: typeof SET_LOGIN_TOKEN, login: string}

export function SetLoginToken(login: string): SetLoginToken {
    return {type: SET_LOGIN_TOKEN, login}
}
