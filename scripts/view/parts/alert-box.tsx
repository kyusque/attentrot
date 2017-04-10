import * as React from 'react';

export default class AlertBox extends React.Component<{type?: string, children?: React.ReactNode}, {}> {
    render() {
        return (
            <div className={`alert alert-${this.props.type || 'danger'}`} role="alert">
                {this.props.children}
            </div>
        )
    }
}

