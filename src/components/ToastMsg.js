import React, { Component } from 'react';

class ToastMsg extends Component {

    // props : showMsg, msgType?(info), delayTime?(3000), classNames[]?, callback()?
    //Also we can have config/custom object which have displayCloseBtn, keepMsg(No timeout), delaytime, classnames and callback 
    constructor(props) {
        super(props);
        this.state = { showMsg: props.showMsg };
    }

    componentDidMount() {
        const delay = this.props.delayTime || 3000;
        this.timer = setTimeout(() => {
            this.closeMsg();
        }, delay);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    closeMsg() {
        this.setState({showMsg: false});
        (typeof this.props.callback === 'function') && this.props.callback();
    }

    render() {
        if (!this.state.showMsg) {
             return null;
        }
        let classNames = 'alert alert-' + (this.props.msgType || 'info');
        classNames =  classNames + (this.props.classNames && this.props.classNames.length ? ' ' + this.props.classNames.join(' ') : '');
        return ( <div className="c-toast">
                <div className={classNames}>
                    {this.props.message}.
                    <button type="button" onClick={this.closeMsg} className="close" data-dismiss="alert" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
            </div>
         );
    }
}

export default ToastMsg;