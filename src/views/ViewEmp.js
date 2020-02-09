import React, {Component}from 'react';
import {NavLink} from 'react-router-dom';
import ToastMsg from "../components/ToastMsg";
import ToastMsgContext from '../contexts/ToastMsgContext';
import ToastMsgConsumer from '../contexts/ToastMsgConsumer';

class ViewEmp extends Component {

    employee = { };
    static contextType = ToastMsgContext;
    constructor(props) {
        super(props);
          this.state = { 
            load: false, // without state it will not render update after service call
            showMsg : false
        }; 
        this.getEmployeeDetails();
    }
    
    getEmployeeDetails() {
        if(!this.props.match.params.empId) { // we can create variable and us followed places
            return;
        }
        const getURL = 'http://localhost:4000/employees/' + this.props.match.params.empId;
        fetch(getURL)
        .then(res => res.json())
        .then(
            (result) => {
                this.employee = result;
                // this.render(); //doesn't work to get updated values because of shallow dom
                this.setState({load : true}); // renders method get called to update values
            },
            (error) => {
            
            }
        )
    }
    deleteEmployee = () => {
        fetch("http://localhost:4000/employees/" + this.props.match.params.empId, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
        .then(
            (result) => {
                this.showToastMsg('Deleted successfully!', 'success');
                setTimeout(() => {
                    this.props.history.push('/employees');
                }, 2000);
            },
            (error) => {
                console.log(error);
                this.showToastMsg('Failed to delete!', 'danger');
            }
        );
    }
    showToastMsg = (msg, type, delayTime = 3000) => {
        this.toastProps = {
            // showMsg: true,
            msgType: type,
            message: msg,
            delayTime
        }
        // this.setState({showMsg: true});
        this.context.toggleToastMsg(true);
    }

    render () {
        const editUrl = "/employees/add-edit-employee/" + this.props.match.params.empId;
        return <div>
            <h3 className="text-center">View Employee </h3>
            <div className="container">
            <ToastMsgConsumer {...this.toastProps}></ToastMsgConsumer>

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
 
export default ViewEmp;