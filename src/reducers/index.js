import employees from './employee'
import filterValue from './filterValue'
import toastMsg from './toastMsg'

import { combineReducers } from 'redux';

export default combineReducers({ employees: employees, filterValue : filterValue, toastMsg: toastMsg});;

