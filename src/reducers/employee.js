const INITIAL_EMP_LIST = [
    { name: 'Jay', address: 'Pune', mobileNumber: '242342', salary: 10000, id: 101},
    { name: 'AJay', address: 'Kune', mobileNumber: '44232', salary: 20000, id: 102},
    { name: 'VJay', address: 'June', mobileNumber: '44444', salary: 10000, id: 103},
    { name: 'SanJay', address: 'Mune', mobileNumber: '666666', salary: 12000, id: 104}
  ];

function employees(state = INITIAL_EMP_LIST, action) {
 
    switch(action.type) {
        case 'ADD_EMP' : return state.concat(action.item);
        case 'UPDATE_EMP' : return state.map(emp => (emp.id === action.item.id) ? action.item : emp);
        case 'DELETE_EMP' : return state.filter(emp => (emp.id !== action.id));
        default : return state;
    }
}
export default employees;