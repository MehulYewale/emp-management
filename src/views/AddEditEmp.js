import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

// this can be functional component
class AddEditEmp extends Component {

    employee = {
        name : '',
        address: '',
        mobileNumber: '',
        salary: ''
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
              this.employee.id = result.id;
              this.employee.name.value = result.name;
              this.employee.address.value = result.address;
              this.employee.mobileNumber.value = result.mobileNumber;
              this.employee.salary.value = result.salary;
          },
          (error) => {
            
          }
        )
    }
   

    onSubmitAction = () => {
        if(!this.employee.name.value) {
            alert("Please Enter Name");
            return;
        } 
        let url = "http://localhost:4000/employees",
            method = "POST";
        if(this.props.match.params.empId) {
            url = url +  "/" + this.props.match.params.empId;
            method = "PUT";
        }
        fetch(url, {
            method: method,
            // mode: 'cors',
            headers:{
                'Content-Type': 'application/json',
              },
            body: JSON.stringify({
                name : this.employee.name.value,
                address: this.employee.address.value,
                mobileNumber: this.employee.mobileNumber.value,
                salary: this.employee.salary.value
            })
        })
        .then(res => res.json())
        .then(
          (result) => {
                if(!this.props.match.params.empId) {
                    alert("Added Succssfully");
                    this.props.history.push('/employees');
                } else {
                    alert("Updated Succssfully");
                }
          },
          (error) => {
                console.log(error);
          }
        )
    }

    render(props) {
        console.log(props);
        this.getEmployeeDetails();
        return <div>
             <h3 className="text-center">Add/Edit Employee </h3>
             <div className="container">
                <form>
                    {this.props.match.params.empId && <div className="form-group">
                        <label>Id : {this.props.match.params.empId || 'New'} </label>
                    </div>}
                    <div className="form-group">
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
                    </div>
                    <button type="button" onClick={this.onSubmitAction} className="btn btn-primary">Submit</button> &nbsp;
                    <NavLink to="/employees"><button type="button" className="btn btn-secondary">Back</button></NavLink>
                </form>
            </div>
        </div>;
    }
}
 
export default AddEditEmp;