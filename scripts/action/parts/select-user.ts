export const SELECT_USER = 'SELECT_USER';

export interface SelectUser {type: typeof SELECT_USER, id: number}

export function SelectUser(id: number): SelectUser {
    return {type: SELECT_USER, id}
}
