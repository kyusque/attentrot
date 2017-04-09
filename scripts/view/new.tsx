import * as React from 'react';

import {State} from '../state/new';
import * as A from '../action/new';

import UserSelect from './parts/user-select';
import OtpInput from './parts/otp-input';
import {exhaustive} from '../utils';

export default class NewUserApp extends React.Component<State&A.Dispatcher, {}> {
    renderQRValidate() {
        const {qrcode} = this.props;
        if (!qrcode) return;
        return (
            <form className="form-inline" onSubmit={v => this.submit(v)}>
                <OtpInput onChange={v => this.setPassword(v)}/>
                <button className="btn btn-primary" type="submit">確認</button>
            </form>
        );
    }

    renderQRImage() {
        const {qrcode} = this.props;
        if(!qrcode) return;
        return <div><img src={qrcode} /></div>;
    }

    render() {
        const {users, id} = this.props;

        return (
            <div className="container">
                <h1>ログイン登録</h1>
                <h3>1. 2段階認証アプリをインストール</h3>
                <div>
                    <h3>android</h3>
                    <a href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2">Google認証システム</a>
                    <h3>iOS</h3>
                    <a href="https://itunes.apple.com/jp/app/google-authenticator/id388497605">Google Authenticator</a>
                </div>

                <h3>2. 名前を選択してQRコードを発行</h3>
                <div className="form-inline">
                    <UserSelect users={users} onChange={v => this.selectUser(v)} selectedId={id}/>
                    <button className="btn btn-default" onClick={() => this.issueQRCode()}>QRコード発行</button>
                </div>

                <h3>3. 2段階認証アプリでQRコードを読み取る</h3>

                {this.renderQRImage()}

                <h3>4. 6ケタの数字を入力して「確認」</h3>

                {this.renderQRValidate()}
                {this.renderResult()}

                <div className="text-right">
                    <a href="/">戻る</a>
                </div>
            </div>
        )
    }

    renderResult() {
        const {phase} = this.props;
        switch (phase.type) {
            case A.POST_QRCODE_VERIFY_SUCCESS:
                return <h1>完了しました</h1>;

            case A.ALREADY_VERIFIED:
                return <h1>既に携帯電話が登録されているアカウントです</h1>

            case A.DATABASE_ERROR:
                return <h1>データベースエラー: {phase.message}</h1>

            case A.GENERATION_FAILED:
                return <h1>QRコードを生成できませんでした</h1>

            case A.QRCODE_VERIFY_FAILURE:
                return <h1>パスワードを間違えています</h1>

            case A.NO_SUCH_USER_ID:
                return <h1>IDが存在しません</h1>

            case A.RAW_ERROR:
                return <h1>不明なエラー: {phase.message}</h1>

            case null:
                return;

            default:
                exhaustive(phase);
                return;
        }
    }

    issueQRCode() {
        this.props.dispatch(A.PostQRCodeIssue(this.props.id));
    }

    selectUser(v: number) {
        this.props.dispatch(A.SelectUser(v));
    }

    setPassword(v: string) {
        this.props.dispatch(A.SetPassword(v));
    }

    submit(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();
        const {id, password} = this.props;
        this.props.dispatch(A.PostQRCodeVerify({id, password: parseInt(password)}));
    }
}
