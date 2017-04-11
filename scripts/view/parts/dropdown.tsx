import * as React from 'react';
import classnames from 'classnames';

export interface DropdownProps {children?: React.ReactNode}

export class Dropdown extends React.Component<DropdownProps, {on: boolean, callback: (e: MouseEvent) => void}> {
    constructor(props: DropdownProps) {
        super(props);
        this.state = {on: false, callback: (e) => this.hideMenu(e)};
    }

    render() {
        const {on} = this.state;
        return (
            <div className="pull-right dropdown">
                <button ref="button" className={classnames("btn btn-default dropdown-toggle", {active: on})} onClick={_ => this.toggle()} type="button">
                    <i ref="icon" className="fa fa-bars fa-lg" aria-hidden="true"/>
                </button>
                <ul className="dropdown-menu" style={{display: on ? 'block' : null}}>
                    {this.props.children}
                </ul>
            </div>
        )
    }

    toggle() {
        this.setState({on: !this.state.on});
    }

    hideMenu(e: MouseEvent) {
        if (e.target !== this.refs.button && e.target !== this.refs.icon) {
            this.setState({ on: false });
        }
    }

    componentDidMount() {
        document.addEventListener('click', this.state.callback);
    }

    componentWillUnmount() {
        document.removeEventListener('click', this.state.callback);
    }
}
