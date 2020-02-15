function filterValue(state = '', action) {
 
    switch(action.type) {
        case 'EMP_SEARCH_BY': return (state = action.value);
        default : return state;
    }
}
export default filterValue;