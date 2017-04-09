import * as React from 'react';

export interface Props {
    onChange?: (ev: string) => any;
    id?: string;
}

export default class OtpInput extends React.Component<Props, {otp: string}> {
    constructor(props: Props) {
        super(props)
        this.state = {otp: ''}
    }

    render() {
        const { id } = this.props;
        return (
            <input className="form-control" type="text" placeholder="\\d{6}" onChange={v => this.onChange(v)} value={this.state.otp} id={id}/>
        )
    }

    onChange(ev: React.ChangeEvent<HTMLInputElement>) {
        const {value} = ev.target;
        const newValue = value.replace(/\D/g, '').slice(0, 6);

        if (value === newValue) {
            this.setState({ otp: newValue }, () => {
                if (this.props.onChange) this.props.onChange(newValue);
            });
        }
    }
}
