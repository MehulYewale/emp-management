import React, { Component } from 'react';
import './App.css';
import BaseRouters from './BaseRouters';
import ToastMsg from "./components/ToastMsg";


class App extends Component {

  render() {
    return (
      <div className="emp-app container position-relative">
        <ToastMsg></ToastMsg>
        <BaseRouters></BaseRouters>
      </div>
    );
  }
}

export default App;
