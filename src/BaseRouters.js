import React, { Component } from "react";
import { Route, BrowserRouter, Switch, Redirect, Link } from "react-router-dom";
import Home from "./views/Home";
import AddEditEmp from './views/AddEditEmp';
import EmpList from './views/EmpList';
import ViewEmp from './views/ViewEmp';

class BaseRouters extends Component {
  render() {
    const home = {
      path: "/home", // only '/' will not work for Redirect route, if '/' the route become always active
      component: Home
    };

    //we can use this in indepedent component. like in Jsx comp
    const CustomLink = ({ children, to, exact }) => (
      <Route
        path={to}
        exact={exact}
        children={({ match }) => (
          <div className={match ? "active" : ""}>
            {match ? "> " : ""}
            <Link to={to}>{children}</Link>
          </div>
        )}
      />
    );

    return (
      <BrowserRouter>
        <React.Fragment>
          {/* <NavigationHeader /> */}
          {/* <RouterConfigHOC> */}
          {/* RouterConfigHOC one require if we want to watch on route change */}
          <Switch>
            <Route {...home} exact />
            <Route path="/home/:name" component={Home} />
            <Route path="/employees/add-edit-employee/:empId" component={AddEditEmp} />
            <Route path="/employees/add-edit-employee" component={AddEditEmp} />
            <Route path="/employees/view/:empId" component={ViewEmp} />
            {/* if we have child url path like /employees/add then will have to put that befoer parent...eg: above  */}
            <Route path="/employees" component={EmpList} />


            {/* <Redirect to="/jsx" /> */}
            {/* Redirect works for wrong path as well so following Route will not work */}
            {/* <Route
              children={match => {
                return (
                  <div>
                    <Error info={match} />
                    {console.log(match)}
                  </div>
                );
              }}
            /> */}
            {/* no path needs switch else it will always render, only one(first) no path element will be active*/}
            {/* <Route component={Error} /> */}
          </Switch>
          {/* </RouterConfigHOC> */}

          {/* <CustomLink to="/jsx">JSX</CustomLink> */}
        </React.Fragment>
      </BrowserRouter>
    );
  }
}

export default BaseRouters;
