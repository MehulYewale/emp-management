import React, {useContext} from 'react';
import ToastMsg from "../components/ToastMsg";
import ToastMsgContext from './ToastMsgContext';

const ToastMsgConsumer = (props) => {
    const toastMsg = useContext(ToastMsgContext);

    const callback = () => {
        toastMsg.toggleToastMsg(false);
    }

    return (
        <ToastMsgContext.Consumer> 
            {
                value => value.showToastMsg ? <ToastMsg {...props} callback={callback} ></ToastMsg> : null
            }
        </ToastMsgContext.Consumer>
    )
}

export default ToastMsgConsumer;