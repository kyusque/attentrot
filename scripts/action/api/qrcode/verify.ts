import {DatabaseError, NoSuchUserID} from '../_errors';

export const POST_QRCODE_VERIFY = 'POST /qrcode/verify'
export const POST_QRCODE_VERIFY_SUCCESS = 'POST /qrcode/verify success'
export const QRCODE_VERIFY_FAILURE = 'POST /qrcode/verify failure'

export interface PostQRCodeVerify {type: typeof POST_QRCODE_VERIFY, id: number, password: number}
export interface PostQRCodeVerifySuccess {type: typeof POST_QRCODE_VERIFY_SUCCESS, id: number}
export interface QRCodeVerifyFailure {type: typeof QRCODE_VERIFY_FAILURE, id: number}

export function PostQRCodeVerify(args: {id: number, password: number}): PostQRCodeVerify {
    return {type: POST_QRCODE_VERIFY, ...args};
}

export function PostQRCodeVerifySuccess(id: number): PostQRCodeVerifySuccess {
    return {type: POST_QRCODE_VERIFY_SUCCESS, id}
}

export function QRCodeVerifyFailure(id: number): QRCodeVerifyFailure {
    return {type: QRCODE_VERIFY_FAILURE, id}
}

export type PostQRCodeVerifyFailure
    = DatabaseError
    | QRCodeVerifyFailure
    | NoSuchUserID

export type QRCodeVerifyAction
    = PostQRCodeVerify | PostQRCodeVerifySuccess | PostQRCodeVerifyFailure
