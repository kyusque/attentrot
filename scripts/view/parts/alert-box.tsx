import * as React from 'react';

export default class AlertBox extends React.Component<{children?: React.ReactNode}, {}> {
    render() {
        return (
            <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>{this.props.children}
            </div>
        )
    }
}

