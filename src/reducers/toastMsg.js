function taostMsg(state = {showMsg: false}, action) {
    switch(action.type) {
        case 'SHOW_TOAST_MSG' : return {...action.value, showMsg: true};
        case 'HIDE_TOAST_MSG' : return {...action.value, showMsg: false};
        default : return {showMsg: false};
    }
}
export default taostMsg;