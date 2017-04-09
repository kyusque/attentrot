export const SET_PASSWORD = 'SET_PASSWORD';

export interface SetPassword {type: typeof SET_PASSWORD, password: string}

export function SetPassword(password: string): SetPassword {
    return {type: SET_PASSWORD, password}
}
