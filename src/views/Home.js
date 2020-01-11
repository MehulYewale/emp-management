import React, { Component } from "react";
import {NavLink} from 'react-router-dom';
class Home extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <h3 className="text-center">Home Comp</h3>
        <h4 className="text-center">
          Welcome &nbsp;
          {this.props.match.params.name
            ? this.props.match.params.name.toUpperCase()
            : "Guest"}
        </h4>
        <div className="home-content">
            <ul>
              <li>
                <NavLink to="/employees">Go to employees list</NavLink>
              </li>
            </ul>
        </div>
      </div>
    );
  }
}

export default Home;
