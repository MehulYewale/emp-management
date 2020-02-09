import React from 'react';

const ToastMsgContext = React.createContext({
    showToastMsg: false,
    toggleToastMsg:() => {}
});

export default ToastMsgContext;

