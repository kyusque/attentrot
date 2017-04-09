import * as React from 'react';
import * as A from '../action/record';
import {State} from '../state/record';
import classNames from 'classnames';
import {ATTENDANCE_WORKING, ATTENDANCE_BREAK, ATTENDANCE_LEAVE, CLOCK_IN, CLOCK_OUT, PostRecord, ToggleBreak, isAcceptableEvent} from '../action/record';
import {exhaustive} from '../utils';
import AlertBox from './parts/alert-box';

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

        const clockInOk = isAcceptableEvent(attendance.type, CLOCK_IN);
        const clockOutOk = isAcceptableEvent(attendance.type, CLOCK_OUT);
        const breakOk = attendance.type === ATTENDANCE_WORKING || attendance.type === ATTENDANCE_BREAK;

        return (
            <div className="container record">
                <div className="row header clearfix">
                    <div className="name pull-left">{user.name} さん</div>
                    <div className="pull-right"><a className="logout" href='/logout'><i className="fa fa-sign-out" aria-hidden="true"></i></a></div>
                </div>

                {this.error()}
                <Clock time={this.props.workTime || undefined}/>
                <div className="row">
                    <div className="btn-group btn-group-lg btn-group-justified" role="group">
                        <a className={classNames(['btn', 'btn-default'], {'btn-primary': attendance.type === ATTENDANCE_WORKING})}
                           disabled={!clockInOk}
                           onClick={_ => clockInOk && this.postRecord(CLOCK_IN)}>出席</a>
                        <a className={classNames(['btn', 'btn-default'], {'btn-primary': attendance.type === ATTENDANCE_LEAVE})}
                           disabled={!clockOutOk}
                           onClick={_ => clockOutOk && window.confirm('帰宅しますか？') && this.postRecord(CLOCK_OUT)}>帰宅</a>
                    </div>

                    <div className="btn-group btn-group-lg btn-group-justified" role="group">
                        <a className={classNames(['btn', 'btn-default'], {active: attendance.type === ATTENDANCE_BREAK})}
                           disabled={!breakOk}
                           onClick={_ => breakOk && this.toggleBreak()}>休憩</a>
                    </div>
                </div>
            </div>
        )
    }

    postRecord(t: typeof CLOCK_IN|typeof CLOCK_OUT) {
        this.props.dispatch(PostRecord(t));
    }

    toggleBreak() {
        this.props.dispatch(ToggleBreak);
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
