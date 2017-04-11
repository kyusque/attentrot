import {User, safeUser} from '../../state/parts/users';

export const GET_CALENDAR = 'GET /calendar';
export const GET_CALENDAR_SUCCESS = 'GET /calendar success';

export interface GetCalendar {type: typeof GET_CALENDAR}
export interface GetCalendarSuccess {type: typeof GET_CALENDAR_SUCCESS, user: User}

export const GetCalendar: GetCalendar = {type: GET_CALENDAR}

export function GetCalendarSuccess({user}: {user: User}): GetCalendarSuccess {
    return {type: GET_CALENDAR_SUCCESS, user: safeUser(user)}
}

export type CaledarAction
    = GetCalendar | GetCalendarSuccess

