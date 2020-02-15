export const ADD_EMP = item => ({
    type: 'ADD_EMP',
    item: item
});

export const UPDATE_EMP = (item) => {
    return {
        type: 'UPDATE_EMP',
        item: item
    }
}

export const DELETE_EMP = (id) => ({
    type: 'DELETE_EMP',
    id: id
});

export const SHOW_TOAST_MSG = (value) => ({
    type: 'SHOW_TOAST_MSG',
    value: value
});

export const HIDE_TOAST_MSG = (value) => ({
    type: 'HIDE_TOAST_MSG',
    value: value
});