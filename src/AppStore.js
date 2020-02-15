import React from 'react'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './App'
import reducers from './reducers'

console.log(reducers);
const store = createStore(reducers);

/* will have to put export store if we need to access store object from other comp */

 
function AppStore() {
    console.log("Initial employee data : ", store.getState());
    // store.dispatch({type:'ADD_ITEM', item: { id: 105, name: 'Jay', address: 'Pune', mobileNumber: '242342', salary: 10000 }});
    return (
    <Provider store={store}>
        <App />
    </Provider>
    )
}



export { AppStore, store };
