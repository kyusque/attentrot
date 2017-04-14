import * as React from 'react';
import classnames from 'classnames';

import AlertBox from './parts/alert-box';
import {Dropdown} from './parts/dropdown';

import * as A from '../action/record';

import {State} from '../state/record';

import exhaustive from '../common/exhaustive';

function padding02(n: number): string {
    const s = n.toString();
    switch (s.length) {
        case 1:
            return '0' + s;
        case 2:
            return s;
        default:
            return '??';
    }
}

interface ClockProps {time?: [number, number, number]};

class Clock extends React.Component<ClockProps, {}> {
    clockTime() {
        if (!this.props.time) {
            return '--:--:--';;
        }
        const [hours, minutes, seconds] = this.props.time;
        return `${padding02(hours)}:${padding02(minutes)}:${padding02(seconds)}`
    }

    render() {
        return <div className="clock text-center">{this.clockTime()}</div>
    }

    shouldComponentUpdate(nextProps: ClockProps): boolean {
        const [ch, cm, cs] = this.props.time || [NaN, NaN, NaN];
        const [nh, nm, ns] = nextProps.time || [NaN, NaN, NaN];

        return ch != nh || cm != nm || cs != ns;
    }
}

export default class RecordApp extends React.Component<State&A.Dispatcher, {}> {
    render() {
        const {user, attendance} = this.props;
        if (!user) {
            return null;
        }

        const clockInOk = A.isAcceptableEvent(attendance.type, A.CLOCK_IN);
        const clockOutOk = A.isAcceptableEvent(attendance.type, A.CLOCK_OUT);
        const breakOk = attendance.type === A.ATTENDANCE_WORKING || attendance.type === A.ATTENDANCE_BREAK;

        return (
            <div className="container record">
                <div className="row header clearfix">
                    <div className="name pull-left">{user.name} さん</div>
                    <Dropdown>
                        <li><a href="/calendar"><i className="fa fa-calendar" aria-hidden="true" /> 出席確認</a></li>
                        <li role="separator" className="divider"/>
                        <li><a className="logout" href='/logout'><i className="fa fa-sign-out" aria-hidden="true" />ログアウト</a></li>
                    </Dropdown>
                </div>

                {this.error()}
                <Clock time={this.props.workTime || undefined}/>
                <div className="row">
                    <div className="btn-group btn-group-lg btn-group-justified" role="group">
                        <a className={classnames(['btn', 'btn-default'], {'btn-primary': attendance.type === A.ATTENDANCE_WORKING})}
                           disabled={!clockInOk}
                           onClick={_ => clockInOk && this.postRecord(A.CLOCK_IN)}>出席</a>
                        <a className={classnames(['btn', 'btn-default'], {'btn-primary': attendance.type === A.ATTENDANCE_LEAVE})}
                           disabled={!clockOutOk}
                           onClick={_ => clockOutOk && window.confirm('帰宅しますか？') && this.postRecord(A.CLOCK_OUT)}>帰宅</a>
                    </div>

                    <div className="btn-group btn-group-lg btn-group-justified" role="group">
                        <a className={classnames(['btn', 'btn-default'], {active: attendance.type === A.ATTENDANCE_BREAK})}
                           disabled={!breakOk}
                           onClick={_ => breakOk && this.toggleBreak()}>休憩</a>
                    </div>
                </div>
            </div>
        )
    }

    postRecord(t: typeof A.CLOCK_IN|typeof A.CLOCK_OUT) {
        this.props.dispatch(A.PostRecord(t));
    }

    toggleBreak() {
        this.props.dispatch(A.ToggleBreak);
    }

    error() {
        const {phase} = this.props;


        switch (phase.type) {
            case A.RAW_ERROR:
                return <AlertBox>不明なエラー: {phase.message}</AlertBox>

            case A.DATABASE_ERROR:
                return <AlertBox>データベースエラー: {phase.message}</AlertBox>

            case A.AUTHENTICATION_FAILED:
                return <AlertBox>ログインに失敗しました。5秒後にログイン画面に戻ります。</AlertBox>

            case A.NOT_ACCEPTABLE_EVENT:
                return <AlertBox>現在の状態 ({phase.current}) では記録できないイベント ({phase.next}) です</AlertBox>

            case null:
                return null;

            default:
                exhaustive(phase)
                return null;
        }
    }
}
