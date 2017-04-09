import {DatabaseError} from './_errors';
import {User} from '../../state/parts/users';

export const GET_STATUS = 'GET /status';
export const GET_STATUS_SUCCESS = 'GET /status success';

export const ATTENDANCE_YET = "ATTENDANCE_YET";
export const ATTENDANCE_WORKING = "ATTENDANCE_WORKING";
export const ATTENDANCE_BREAK = "ATTENDANCE_BREAK";
export const ATTENDANCE_LEAVE = "ATTENDANCE_LEAVE";

export type AttendancePhase
    = {type: typeof ATTENDANCE_YET}
    | {type: typeof ATTENDANCE_WORKING, clockIn: number, workTime: number, eventStart: number}
    | {type: typeof ATTENDANCE_BREAK, clockIn: number, workTime: number, eventStart: number}
    | {type: typeof ATTENDANCE_LEAVE, clockIn: number, workTime: number, eventStart: number}

export interface GetStatus {type: typeof GET_STATUS}
export interface GetStatusSuccess {type: typeof GET_STATUS_SUCCESS, attendance: AttendancePhase, user: User}

export const GetStatus: GetStatus = {type: GET_STATUS}

export function GetStatusSuccess({user, attendance}: {user: User, attendance: AttendancePhase}): GetStatusSuccess {
    return {type: GET_STATUS_SUCCESS, attendance, user}
}

export type GetStatusFailure
    = DatabaseError
    | never

export type StatusAction = GetStatus | GetStatusSuccess | GetStatusFailure;
