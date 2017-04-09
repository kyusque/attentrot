import {AuthenticationFailed} from './_errors';
import {AttendancePhase, ATTENDANCE_YET, ATTENDANCE_WORKING, ATTENDANCE_BREAK, ATTENDANCE_LEAVE} from './status';

export const POST_RECORD = 'POST /record';
export const POST_RECORD_SUCCESS = 'POST /record success';
export const NOT_ACCEPTABLE_EVENT = 'NOT_ACCEPTABLE_EVENT';
export const UPDATE_CLOCK = 'UPDATE_CLOCK';

export const CLOCK_IN = 'clock-in';
export const CLOCK_OUT = 'clock-out';
export const BREAK_START = 'break-start';
export const BREAK_END = 'break-end';

export function isAcceptableEvent(phase: AttendancePhase['type'], event: AttendanceEventType): boolean {
    switch (phase) {
        case ATTENDANCE_YET:
            return event === CLOCK_IN;
        case ATTENDANCE_WORKING:
            return event === CLOCK_OUT || event === BREAK_START;
        case ATTENDANCE_BREAK:
            return event === BREAK_END;
        case ATTENDANCE_LEAVE:
            return event === CLOCK_IN;
    }
}

export type AttendanceEventType
    = typeof CLOCK_IN
    | typeof CLOCK_OUT
    | typeof BREAK_START
    | typeof BREAK_END

export interface PostRecord {type: typeof POST_RECORD, event: AttendanceEventType}
export interface PostRecordSuccess {type: typeof POST_RECORD_SUCCESS, attendance: AttendancePhase};
export interface NotAcceptableEvent {type: typeof NOT_ACCEPTABLE_EVENT, current: AttendancePhase['type'], next: AttendanceEventType};
export interface UpdateClock {type: typeof UPDATE_CLOCK, now: number}

export function PostRecord(event: AttendanceEventType): PostRecord {
    return {type: POST_RECORD, event}
}

export function PostRecordSuccess(attendance: AttendancePhase): PostRecordSuccess {
    return {type: POST_RECORD_SUCCESS, attendance}
}

export function NotAcceptableEvent({current, next}: {current: AttendancePhase['type'], next: AttendanceEventType}): NotAcceptableEvent {
    return {type: NOT_ACCEPTABLE_EVENT, current, next};
}

export function UpdateClock(now: number) {
    return {type: UPDATE_CLOCK, now}
}

export type PostRecordFailure
    = AuthenticationFailed
    | NotAcceptableEvent;

export type RecordAction = PostRecord | UpdateClock | PostRecordSuccess | PostRecordFailure;
