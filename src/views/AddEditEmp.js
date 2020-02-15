import React, { Component } from 'react';
import {NavLink, withRouter} from 'react-router-dom';
// import ToastMsg from "../components/ToastMsg";
import AppInput from '../components/app.input';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AddEditEmp extends Component {
    
    constructor(props) {
        super(props);
        this.state = { 
            // showToastMsg: false,
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

    componentWillUnmount() {
        this.props.hideToastMsg();
    }

    getEmployeeDetails() {
        if(!this.props.match.params.empId) {
            return;
        }
        // because of form control we have to keep state here
        this.setState({employee: this.props.employee});
        // const getURL = 'http://localhost:4000/employees/'  + this.props.match.params.empId;
        // fetch(getURL)
        // .then(res => res.json())
        // .then(
        //   (result) => {
        //       console.log("after get call",result);
        //       this.setState({employee:result});
        //   },
        //   (error) => {
            
        //   }
        // )
    }
   

    onSubmitAction = () => {
        this.formSubmitted = true; // for trigger inbuild html5 validation

        if(!this.state.employee.name) { // custom validation on fields
            this.showToastMsg("Please Enter Name", 'danger');
            return;
        }
        let msg = {msgType: 'success', message:''};
        // let url = "http://localhost:4000/employees",
        //     method = "POST";
        if(this.props.match.params.empId) {
            // url = url +  "/" + this.props.match.params.empId;
            // method = "PUT";
            this.props.updateEmployee(this.state.employee);
            msg.message = 'Updated Succssfully!';
        } else {
            this.props.addEmployee({...this.state.employee, id: this.props.lastEmpId});
            msg.message = 'Added Succssfully!';
        }
        this.props.showToastMsg(msg);

        // fetch(url, {
        //     method: method,
        //     // mode: 'cors',
        //     headers:{
        //         'Content-Type': 'application/json',
        //       },
        //     body: JSON.stringify({
        //         name : this.state.employee.name,
        //         address: this.state.employee.address,
        //         mobileNumber: this.state.employee.mobileNumber,
        //         salary: this.state.employee.salary
        //     })
        // })
        // .then(res => res.json())
        // .then(
        //   (result) => {
        //         if(!this.props.match.params.empId) {
        //             this.showToastMsg("Added Succssfully!", 'success');
        //                 setTimeout(() => {
        //                     this.props.history.push('/employees');
        //                 }, 2000);
        //         } else {
        //             this.showToastMsg("Updated Succssfully!", 'success');
        //         }
        //   },
        //   (error) => {
        //         console.log(error);
        //   }
        // )
    }
    // showToastMsg = (msg, type) =>  {
    //     this.setState({showToastMsg: false}, // stop if it trigger again
    //         () => {             // to make synchroneous while multiple click on same time.
    //         this.toastProps = {
    //             showMsg: true,
    //             msgType: type,
    //             message: msg,
    //             callback: () => this.setState({showToastMsg: false})  //callback will trigger after closing 
    //         }
    //         this.setState({showToastMsg : true});    // to show msg 
    //     });
    // }

    employeeChangeHandler = (event) => {
        const {name, value} = event.target;
        this.setState((prevEmp) => ({
            employee : {...prevEmp.employee, [name]:value}
        }));
        setTimeout(()=> {
            console.log(this.state);
        },3000)
    }

    render() {
        return <div>
             <h3 className="text-center">Add/Edit Employee </h3>
             <div className="container">
                {/* { this.state.showToastMsg && <ToastMsg {...this.toastProps}></ToastMsg>} */}
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


const mapStateToProps = (state, ownProps) => {
    console.log('ownProps', ownProps);
    return { 
        employee: getEmp(state.employees, ownProps.match.params.empId ),
        lastEmpId: state.employees[state.employees.length -1].id + 1
    }
};

const getEmp = (list, id) => {
    return list.find(obj => obj.id === Number(id))
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        updateEmployee: (item) => {
            dispatch(actions.UPDATE_EMP(item));
        },
        addEmployee: (item) => {
            dispatch(actions.ADD_EMP(item));
        },
        hideToastMsg: () => dispatch(actions.HIDE_TOAST_MSG()),
        showToastMsg: (msg) => dispatch(actions.SHOW_TOAST_MSG(msg))
    }
}
 
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddEditEmp));