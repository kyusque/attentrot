import * as React from 'react';
import DayPicker from 'react-day-picker';

import {Dropdown} from './parts/dropdown';

import {State} from '../state/calendar';

import {Dispatcher} from '../action/calendar';

export default class CalendarView extends React.Component<State&Dispatcher, {}> {
    render() {
        const {user, yearStart, attendances, notAttendances} = this.props;
        if (!user || !yearStart) {
            return null;
        }

        return (
            <div className="container record">
                <div className="row header clearfix">
                    <div className="name pull-left">{user.name} さん</div>
                    <Dropdown>
                        <li><a href="/record"><i className="fa fa-clock-o" aria-hidden="true" /> 出席記録</a></li>
                        <li role="separator" className="divider"/>
                        <li><a className="logout" href='/logout'><i className="fa fa-sign-out" aria-hidden="true" /> ログアウト</a></li>
                    </Dropdown>
                </div>
                <DayPicker
                    canChangeMonth={false}
                    month={new Date(2017, yearStart - 1)}
                    modifiers={{
                        attendance: attendances,
                        'not-attendance': notAttendances,
                    }}
                    numberOfMonths={12} />
            </div>
        )
    }
}

