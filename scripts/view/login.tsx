import * as React from 'react';
import {User} from '../state/parts/users';

import AlertBox from './parts/alert-box';
import {State} from '../state/login';
import * as A from '../action/login';
import UserSelect from './parts/user-select';
import OtpInput from './parts/otp-input';
import {exhaustive} from '../utils';

export default class LoginApp extends React.Component<State&A.Dispatcher, {}> {
    renderError() {
        const {phase} = this.props;
        switch (phase.type) {
            case A.AUTHENTICATION_FAILED:
                return <AlertBox>パスワードが間違っています</AlertBox>

            case A.DATABASE_ERROR:
                return <AlertBox>データベースエラー: {phase.message}</AlertBox>

            case A.RAW_ERROR:
                return <AlertBox>不明なエラー: {phase.message}</AlertBox>

            case A.NO_SUCH_USER_ID:
                return <AlertBox>IDが存在しません</AlertBox>

            case null:
                return null;

            default:
                exhaustive(phase);
                return null;
        }
    }

    render() {
        const {users, id} = this.props;
        let targetUser: User | null = null;
        for (let i in this.props.users) {
            const user = this.props.users[i];
            if (user.id === id) {
                targetUser = user;
            }
        }
        return (
            <div className="container login">
                <h1>ログイン</h1>
                {this.renderError()}
                <form className="form-horizontal" onSubmit={e => this.login(e)}>
                    <div className="form-group">
                        <label htmlFor="userSelect" className="col-sm-2 control-label">ユーザー名</label>
                        <div className="col-sm-10">
                            <UserSelect id="userSelect" users={users} onChange={v => this.selectUser(v)} selectedId={id} />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="otp" className="col-sm-2 control-label">パスワード</label>
                        <div className="col-sm-10">
                            <OtpInput disabled={targetUser ? targetUser.authType === 'none' : false} id="otp" onOtpUpdate={(v) => this.setPassword(v)} />
                        </div>
                    </div>
                    <div className="login-buttons-wrapper">
                        <div className="btn-group btn-group-lg login-buttons">
                            <button type="submit" className="btn btn-primary">ログイン</button>
                            <a href="/new" className="btn btn-default">登録</a>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

    selectUser(v: number) {
        this.props.dispatch(A.SelectUser(v));
    }

    setPassword(v: string) {
        this.props.dispatch(A.SetPassword(v));
    }

    login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const {id, password} = this.props;
        this.props.dispatch(A.PostLogin({id, password: parseInt(password)}));
    }
}
