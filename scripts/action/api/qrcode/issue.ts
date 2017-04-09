import {DatabaseError} from '../_errors';

export const POST_QRCODE_ISSUE = 'POST /qrcode/issue'
export const POST_QRCODE_ISSUE_SUCCESS = 'POST /qrcode/issue success'

export const ALREADY_VERIFIED = 'POST /qrcode/issue already verified';
export const GENERATION_FAILED = 'POST /qrcode/issue generation failed';

export interface PostQRCodeIssue {type: typeof POST_QRCODE_ISSUE, id: number}
export interface PostQRCodeIssueSuccess {type: typeof POST_QRCODE_ISSUE_SUCCESS ; image: string}

export type AlreadyVerified = {type: typeof ALREADY_VERIFIED, id: number}
export type GenerationFailed = {type: typeof GENERATION_FAILED, message: string}


export function PostQRCodeIssue(id: number): PostQRCodeIssue {
    return {type: POST_QRCODE_ISSUE, id}
}

export function PostQRCodeIssueSuccess(image: string): PostQRCodeIssueSuccess {
    return {type: POST_QRCODE_ISSUE_SUCCESS, image}
}

export function AlreadyVerified(id: number): AlreadyVerified {
    return {type: ALREADY_VERIFIED, id}
}

export function GenerationFailed(message: string): GenerationFailed {
    return {type: GENERATION_FAILED, message}
}

export type PostQRCodeIssueFailure
    = DatabaseError
    | AlreadyVerified
    | GenerationFailed;


export type QRCodeIssueAction
    = PostQRCodeIssue | PostQRCodeIssueSuccess | PostQRCodeIssueFailure
