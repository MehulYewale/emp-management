import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

function ToastMsg(props) {

    // props : showMsg, msgType?(info), delayTime?(3000), classNames[]?, callback()?
    //Also we can have config/custom object which have displayCloseBtn, keepMsg(No timeout), delaytime, classnames and callback 
    // constructor(props) {
    //     super(props);
    //     this.state = { showMsg: props.showMsg };
    // }

    // componentDidMount() {
    //     const delay = this.props.delayTime || 3000;
    //     this.timer = setTimeout(() => {
    //         this.closeMsg();
    //     }, delay);
    // }

    // componentWillUnmount() {
    //     clearTimeout(this.timer);
    // }

    if (!props.showMsg) {
        return null;
    }
    const timer = setTimeout(() => {
        closeMsg();
    }, props.delayTime || 3000);

    const closeMsg = () => {
        props.closeMsg();
        clearTimeout(timer);
        // this.setState({showMsg: false});
        // (typeof this.props.callback === 'function') && this.props.callback();
    }

    let classNames = 'alert alert-' + (props.msgType || 'info');
    classNames =  classNames + (props.classNames && props.classNames.length ? ' ' + props.classNames.join(' ') : '');
    return ( <div className="c-toast">
            <div className={classNames}>
            {props.message}.
            <button type="button" onClick={closeMsg} className="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </div>
    );
};

const mapStateToProps = (state) => state.toastMsg;

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('ownProps', ownProps);
    return {
        closeMsg: () => {
            dispatch(actions.HIDE_TOAST_MSG({}));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastMsg);