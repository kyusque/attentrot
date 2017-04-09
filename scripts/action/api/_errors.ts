export const RAW_ERROR = 'RAW_ERROR'
export const DATABASE_ERROR = 'DATABASE_ERROR'
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const NO_SUCH_USER_ID = 'NO_SUCH_USER_ID'

export type RawError = {type: typeof RAW_ERROR, message: string}
export type DatabaseError = {type: typeof DATABASE_ERROR, message: string}
export interface AuthenticationFailed {type: typeof AUTHENTICATION_FAILED}
export interface NoSuchUserID {type: typeof NO_SUCH_USER_ID, id: number}

export function RawError(message: string): RawError {
    return {type: RAW_ERROR, message}
}

export function DatabaseError(message: string): DatabaseError {
    return {type: DATABASE_ERROR, message}
}

export function NoSuchUserID(id: number): NoSuchUserID {
    return {type: NO_SUCH_USER_ID, id: id}
}

export const AuthenticationFailed: AuthenticationFailed = {type: AUTHENTICATION_FAILED}
