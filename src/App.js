import React, { Component } from 'react';
import './App.css';
import BaseRouters from './BaseRouters';

import ToastMsgContext from './contexts/ToastMsgContext';
import ToastMsgConsumer from './contexts/ToastMsgConsumer';


class App extends Component {

  state = {
    showToastMsg: false,
    toggleToastMsg:(value, toastProps) => {
      // this.toastProps = toastProps;
      this.setState({showToastMsg : value});
    }
  }

  render() {
    return (
      <div className="emp-app container position-relative">
        <ToastMsgContext.Provider value={this.state}>
          <BaseRouters></BaseRouters>
          {/* <ToastMsgConsumer {...this.toastProps}></ToastMsgConsumer> */}
          {/* this will be same as toast even if we change route it stays ... we can use componewillUnmount/routeConfig to clear it while routing */}
        </ToastMsgContext.Provider>
      </div>
    );
  }
}

export default App;
