import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import ToastMsg from "../components/ToastMsg";

const empColumn = (value, classes, index) => (
    <div className="col-sm font-weight-bold" key={index.toString()}>
        {value}
    </div>
);

const EmpColumn = (props) => (
    <div className="col-sm">
        {props.value}
    </div>
);

const LinkColumn = (props) => (
    <div className="col-sm">
        <NavLink to={"/employees/view/" + props.linkId}> <u>{props.value}</u></NavLink>
    </div>
);

const RowActions = (props) => {
    let editUrl = '/employees/add-edit-employee/' + props.rowData.id;
    return <div className="col-sm">
        <NavLink to={editUrl}><button className="fa fa-edit btn p-0 mr-3" title="Edit"></button></NavLink> 
        <button onClick={() => props.deleteAction(props.rowData.id)} className="fa fa-trash btn p-0" title="Delete"></button> 
        {/* not working as there render cycle fails  */}
    </div>;
};

// we can create as one table components which will have all the header and row configuration like ag-grid
const EmpTableRows = (props) => {
    return props.employees.map((emp, index) => {
        var objKeys = Object.keys(emp), rowDataTemplate = [];
        objKeys.forEach((key, index) => {
            if (key === 'name') {
                rowDataTemplate.push(<LinkColumn value={emp[key]} linkId={emp.id} classes="" key={index + 1}></LinkColumn>); 
                // rowDataTemplate.push(empColumn(emp[key],'', index)); // it will not work as expected due to childrens objects 
            } else {
                // rowDataTemplate.push(empColumn(emp[key],'', index)); // it will not work as expected due to childrens objects 
                rowDataTemplate.push(<EmpColumn value={emp[key]} classes="" key={index + 1}></EmpColumn>); //it will create element instead of object
            }
        });
        return <div className="row" key={emp.id.toString()}>
            {rowDataTemplate} 
            <RowActions deleteAction={props.deleteEmployee} rowData={emp}></RowActions>  
            {/* <button onClick={props.deleteEmployee} className="fa fa-trash">Delete</button>  */}
        </div>;
    });
};

class EmpList extends Component {

    list = [];
    constructor(props) {
        super(props);
        this.state = { 
          employees : [
            // { id: 101, name: 'Jay', address: 'Pune', mobileNumber: '242342', salary: 10000 },
            // { id: 102, name: 'AJay', address: 'Kune', mobileNumber: '44232', salary: 20000 },
            // { id: 103, name: 'VJay', address: 'June', mobileNumber: '44444', salary: 10000 },
            // { id: 104, name: 'SanJay', address: 'Mune', mobileNumber: '666666', salary: 12000 }
          ],
          showMsg : false
        };
    }
    
    componentDidMount() {
        fetch("http://localhost:4000/employees")
          .then(res => res.json())
          .then(
            (result) => {
              this.list = [...result];
              this.setState({
                isLoaded: true,
                employees: result
              });
            },
            (error) => {
              this.setState({
                isLoaded: false,
                employees : []
              });
            }
          )
      }
    
    addEmployee = (emp) => {
        this.setState(prevState => {
            return { employees: prevState.employees.concat(emp) };
        });
    }

    editEmployee = (emp) => {
        this.setState(prevState => {
            return { employees: prevState.employees.map(value => {
                return value.id === emp.id ? emp : value;
            }) };
        });
    }

    deleteEmployee = (id) => {
       fetch("http://localhost:4000/employees/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json())
        .then(
            (result) => {
                this.showToastMsg('success', 'Deleted successfully!');
                this.setState(prevState => {
                    return { employees: prevState.employees.filter(value => value.id !== id) };
                });
            },
            (error) => {
                console.log(error);
                this.showToastMsg('danger', 'Failed to delete!');
            }
        );
    }

    searchFilter = (searchString) => {
        this.setState({ employees: this.list.filter(obj => {
            return Object.values(obj).some(val => {
                // val = "" + val; // convert to string
                return (!searchString) ? true : val.toString().includes(searchString);                        
                });
            })
        });
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
        setTimeout(() => {
            this.toastProps.closeAction();
        }, delayTime);
    }

    render() {
        const tableHeaders = ['Name', 'Address', 'Phone_Number', 'Salary', 'Emp_Id', 'Actions'];
        const tableHeaderTemplate = tableHeaders.map((headerName, index) => 
            empColumn(headerName, '' , index + 1)
        );

        // const tableDataTemplate = this.employees.map((emp, index) => {
        //     var objKeys = Object.keys(emp), rowDataTemplate = [];
        //     objKeys.forEach(key => {
        //         // if (key === 'name') {   // it will not work as expected due to childrens objects 
        //         //     rowDataTemplate.push(empColumn(emp[key],'', index));
        //         // } else {
        //         //     rowDataTemplate.push(empColumn(emp[key],'', index));
        //         // }
        //         rowDataTemplate.push(<EmpColumn value={emp[key]} classes="" index={index}></EmpColumn>); //it will create element instead of object
        //     });
        //     return <div className="row" key={emp.id.toString()}>
        //         {rowDataTemplate}
        //     </div>;
        // })

        return <div>
            <h4 className="text-center"> List of Employees</h4>
            <div className="container">
                <ToastMsg {...this.toastProps}></ToastMsg>
                <div className="row"> 
                    <div className="col-sm">
                        <NavLink to="/employees/add-edit-employee"> <button className="fa fa-plus btn btn-primary"> Add Employee</button></NavLink>
                    </div>
                    <div className="col-sm">
                    {/*  Create new component */}
                        <input type="text" className="form-control" onChange={(event) => this.searchFilter(event.target.value)} 
                            placeholder="Search here"/> 
                    </div>
                </div>
                <br/>
                <div className="row">
                    {tableHeaderTemplate}
                </div>
                {/* {tableDataTemplate} */}
                <EmpTableRows employees={this.state.employees} deleteEmployee={this.deleteEmployee}></EmpTableRows>

                 {/* <EmpColumn value="a" classes="" index="3"></EmpColumn> */}
            </div>
        </div>;
    }
} 


export default EmpList;