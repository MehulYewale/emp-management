import React, { Component } from 'react';
import './App.css';
import BaseRouters from './BaseRouters';

class App extends Component {

  render() {
    return (
      <div className="emp-app container position-relative">
          <BaseRouters></BaseRouters>
      </div>
    );
  }
}

export default App;
