import React, {Component}from 'react';
import {NavLink} from 'react-router-dom';
import ToastMsg from "../components/ToastMsg";

class ViewEmp extends Component {

    employee = { };
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
                this.showToastMsg('success', 'Deleted successfully!');
                setTimeout(() => {
                    this.props.history.push('/employees');
                }, 3000);
            },
            (error) => {
                console.log(error);
                this.showToastMsg('danger', 'Failed to delete!');
            }
        );
    }
    showToastMsg = (type, msg, delayTime = 3000) => {
        this.toastProps = {
            showMsg: true,
            type: type,
            message: msg,
            closeAction: () => {
                this.toastProps.showMsg = false;
                this.setState({showMsg : false});
            }
            
        }
        this.setState({showMsg : true});

        setTimeout(() => {
            this.toastProps.closeAction();
        }, delayTime);
    }

    render () {
        const editUrl = "/employees/add-edit-employee/" + this.props.match.params.empId;
        return <div>
            <h3 className="text-center">View Employee </h3>
            <div className="container">
                <ToastMsg {...this.toastProps}></ToastMsg>

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