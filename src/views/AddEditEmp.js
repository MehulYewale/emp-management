import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import ToastMsg from "../components/ToastMsg";
import AppInput from '../components/app.input';
import EmployeeService from '../service/employee.service';

class AddEditEmp extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            showToastMsg: false,
            employee : {
                name : '',
                address: '',
                mobileNumber: '',
                salary: ''
            }
         };
        this.formSubmitted = false;
    }
    
    componentDidMount() {
        this.getEmployeeDetails();
    }

    getEmployeeDetails() {
        if(!this.props.match.params.empId) {
            return;
        }
        const getURL = 'http://localhost:4000/employees/'  + this.props.match.params.empId;
        fetch(getURL)
        .then(res => res.json())
        .then(
          (result) => {
              console.log("after get call",result);
              this.setState({employee:result});
          },
          (error) => {
            
          }
        )
    }
   

    onSubmitAction = () => {
        this.formSubmitted = true; // for trigger inbuild html5 validation

        if(!this.state.employee.name) { // custom validation on fields
            this.showToastMsg("Please Enter Name", 'danger');
            return;
        } 
        const method = this.props.match.params.empId ? 'PUT' : 'POST',
            data = JSON.stringify({
                name : this.state.employee.name,
                address: this.state.employee.address,
                mobileNumber: this.state.employee.mobileNumber,
                salary: this.state.employee.salary
            });

        EmployeeService.addUpdateEmp(method, data, this.props.match.params.empId)
        .then(
          (result) => {
                if(!this.props.match.params.empId) {
                    this.showToastMsg("Added Succssfully!", 'success');
                        setTimeout(() => {
                            this.props.history.push('/employees');
                        }, 2000);
                } else {
                    this.showToastMsg("Updated Succssfully!", 'success');
                }
          },
          (error) => {
                console.log(error);
          }
        )
    }
    showToastMsg = (msg, type) =>  {
        this.setState({showToastMsg: false}, // stop if it trigger again
            () => {             // to make synchroneous while multiple click on same time.
            this.toastProps = {
                showMsg: true,
                msgType: type,
                message: msg,
                callback: () => this.setState({showToastMsg: false})  //callback will trigger after closing 
            }
            this.setState({showToastMsg : true});    // to show msg 
        });
    }

    employeeChangeHandler = (event) => {
        const {name, value} = event.target;
        this.setState((prevEmp) => ({
            employee : {...prevEmp.employee, [name]:value}
        }));
        setTimeout(()=> {
            console.log(this.state);
        },3000)
    }

    render(props) {
        console.log(props);
        return <div>
             <h3 className="text-center">Add/Edit Employee </h3>
             <div className="container">
                { this.state.showToastMsg && <ToastMsg {...this.toastProps}></ToastMsg>}
                {/* bootstrap html5 form validations will activate after submit by adding was-validated class */}
                <form noValidate className={this.formSubmitted ? 'was-validated' : null}> 
                    {this.props.match.params.empId && <div className="form-group font-weight-bold">
                        <label>Id : {this.props.match.params.empId || 'New'} </label>
                    </div>}

                    <AppInput label="Name * " name="name" onChange={this.employeeChangeHandler} value={this.state.employee.name} required></AppInput>
                    <AppInput label="Address" name="address" onChange={this.employeeChangeHandler} value={this.state.employee.address} ></AppInput>
                    <AppInput label="Mobile Number" name="mobileNumber" onChange={this.employeeChangeHandler} value={this.state.employee.mobileNumber} ></AppInput>
                    <AppInput label="Salary" name="salary" onChange={this.employeeChangeHandler} value={this.state.employee.salary} ></AppInput>

                    {/* <div className="form-group">
                        <label>Name *: </label>
                        <input type="text" ref={(input)=> this.employee.name = input} className="form-control" placeholder="Enter Name"/>
                    </div> 
                    <div className="form-group">
                        <label>Address : </label>
                        <input type="text" ref={(input)=> this.employee.address = input} className="form-control"  placeholder="Enter Address"/>
                    </div>
                    <div className="form-group">
                        <label>Phone Number : </label>
                        <input type="text" ref={(input)=> this.employee.mobileNumber = input} className="form-control" placeholder="Enter Mobile Number"/>
                    </div>
                    <div className="form-group">
                        <label>Salary : </label>
                        <input type="text" ref={(input)=> this.employee.salary = input} className="form-control" placeholder="Enter Salary"/>
                    </div> */}
                    <button type="button" onClick={this.onSubmitAction} className="btn btn-primary">Submit</button> &nbsp;
                    <NavLink to="/employees"><button type="button" className="btn btn-secondary">Back</button></NavLink>
                </form>
            </div>
        </div>;
    }
}
 
export default AddEditEmp;