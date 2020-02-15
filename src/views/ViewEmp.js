import React, {Component}from 'react';
import {NavLink, withRouter} from 'react-router-dom';
import ToastMsg from "../components/ToastMsg";
import { connect } from 'react-redux';
import * as actions from '../actions';

class ViewEmp extends Component {

    // employee = { };
    constructor(props) {
        super(props);
        //   this.state = { 
        //     load: false, // without state it will not render update after service call
        //     showMsg : false
        // }; 
        this.getEmployeeDetails();
    }
    
    getEmployeeDetails() {
        if(!this.props.match.params.empId) { // we can create variable and us followed places
            return;
        }
        this.employee = this.props.employee;
        // const getURL = 'http://localhost:4000/employees/' + this.props.match.params.empId;
        // fetch(getURL)
        // .then(res => res.json())
        // .then(
        //     (result) => {
        //         this.employee = result;
        //         // this.render(); //doesn't work to get updated values because of shallow dom
        //         this.setState({load : true}); // renders method get called to update values
        //     },
        //     (error) => {
            
        //     }
        // )
    }
    deleteEmployee = () => {
        this.props.deleteEmployee(Number(this.props.match.params.empId));
        // fetch("http://localhost:4000/employees/" + this.props.match.params.empId, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     }
        // }).then(response => response.json())
        // .then(
        //     (result) => {
        //         this.showToastMsg('Deleted successfully!', 'success');
        //         setTimeout(() => {
        //             this.props.history.push('/employees');
        //         }, 2000);
        //     },
        //     (error) => {
        //         console.log(error);
        //         this.showToastMsg('Failed to delete!', 'danger');
        //     }
        // );
    }
    // showToastMsg = (msg, type, delayTime = 3000) => {
    //     this.toastProps = {
    //         showMsg: true,
    //         msgType: type,
    //         message: msg,
    //         delayTime
    //     }
    //     this.setState({showMsg: true});
    // }

    componentWillUnmount() {
        this.props.hideToastMsg();
    }

    render () {
        const editUrl = "/employees/add-edit-employee/" + this.props.match.params.empId;
        return <div>
            <h3 className="text-center">View Employee </h3>
            <div className="container">
            {/* { this.state.showMsg && <ToastMsg {...this.toastProps}></ToastMsg> } */}

                <div className="form-group row font-weight-bold">
                    <label>Id : </label>
                    <div className="col-sm">{ this.employee.id }</div>
                </div>
                <div className="form-group row">
                    <label>Name *: </label>
                    <div className="col-sm">{ this.employee.name }</div>
                </div>
                <div className="form-group row">
                    <label>Address : </label>
                    <div className="col-sm">{ this.employee.address }</div>
                </div>
                <div className="form-group row">
                    <label>Phone Number : </label>
                    <div className="col-sm">{ this.employee.mobileNumber }</div>
                </div>
                <div className="form-group row">
                    <label>Salary : </label>
                    <div className="col-sm"> {this.employee.salary}</div>
                </div>
                <div className="form-group row">
                    <NavLink to={editUrl}><button type="button" className="btn btn-primary">Edit</button></NavLink> &nbsp;
                    <button type="button" onClick={this.deleteEmployee} className="btn btn-warning">Delete</button>&nbsp;
                    <NavLink to="/employees"><button type="button" className="btn btn-secondary">Back</button></NavLink>
                </div>
            </div>
        </div>;
    }
}
const mapStateToProps = (state, ownProps) => {
    return { 
        employee: getEmp(state.employees, ownProps.match.params.empId )
    }
};

const getEmp = (list, id) => {
    return list.find(obj => obj.id === Number(id))
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        deleteEmployee: (id) => {
            dispatch(actions.DELETE_EMP(id))
            dispatch(actions.SHOW_TOAST_MSG({msgType: 'success', message:'Deleted successfully!'}));
        },
        hideToastMsg: () => dispatch(actions.HIDE_TOAST_MSG())
    }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewEmp));