import React, { Component } from 'react';

class ToastMsg extends Component {
   
    // closeMsg = () => { this.props.closeAction(); };
    render() {
        const classNames = 'alert alert-' + this.props.type + (this.props.classNames || '');
        return ( <div className="c-toast">
                { this.props.showMsg && 
                    <div className={classNames}>
                        {this.props.message}.
                        <button type="button" onClick={this.props.closeAction} className="close" data-dismiss="alert" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                }
            </div>
         );
    }
}
 
export default ToastMsg;