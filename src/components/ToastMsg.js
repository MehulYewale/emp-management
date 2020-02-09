import React, { Component, useEffect } from 'react';

//we can create functional component

// class ToastMsg extends Component {
//     // props : showMsg, msgType?(info), delayTime?(3000), classNames[]?, callback()?
//     //Also we can have config/custom object which have displayCloseBtn, keepMsg(No timeout), delaytime, classnames and callback 
//     // constructor(props) {
//     //     super(props);
//     //     // this.state = { showMsg: props.showMsg };
//     // }

//     componentDidMount() {
//         const delay = this.props.delayTime || 3000;
//         this.timer = setTimeout(() => {
//             this.closeMsg();
//         }, delay);
//     }

//     componentWillUnmount() {
//         clearTimeout(this.timer);
//     }

//     closeMsg() {
//         (typeof this.props.callback === 'function') && this.props.callback();
//     }

//     render() {
//         if (!this.props.message) {
//              return null;
//         }
//         let classNames = 'alert alert-' + (this.props.msgType || 'info');
//         classNames =  classNames + (this.props.classNames && this.props.classNames.length ? ' ' + this.props.classNames.join(' ') : '');
//         return ( <div className="c-toast">
//                 <div className={classNames}>
//                     {this.props.message}.
//                     <button type="button" onClick={this.closeMsg} className="close" data-dismiss="alert" aria-label="Close">
//                         <span aria-hidden="true">&times;</span>
//                     </button>
//                 </div>
//             </div>
//          );
//     }
// }

function ToastMsg(props) {
    
    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
        const delay = props.delayTime || 3000;
        const timer = setTimeout(() => {
            closeMsg();
        }, delay);
        return () => {  // componentWillUnmount
            clearTimeout(timer);
        }
    });

    const closeMsg = () => {
        (typeof props.callback === 'function') && props.callback();
    }

    if (!props.message) {
            return null;
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
}

export default ToastMsg;