import * as React from 'react';
import {State} from '../state/calendar';
import * as A from '../action/calendar';
import {Dropdown} from './parts/dropdown';

export default class CalendarView extends React.Component<State&A.Dispatcher, {}> {
    render() {
        const {user} = this.props;
        if (!user) {
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
            </div>
        )
    }
}

