import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

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
    </div>;
};

// we can create as one table components which will have all the header and row configuration like ag-grid
const EmpTableRows = (props) => {
    return props.employees.map((emp, index) => {
        var objKeys = Object.keys(emp), rowDataTemplate = [];
        objKeys.forEach((key, index) => {
            if (key === 'name') {
                rowDataTemplate.push(<LinkColumn value={emp[key]} linkId={emp.id} classes="" key={index + 1}></LinkColumn>); 
            } else {
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

    // list = [];
    constructor(props) {
        super(props);
        this.state = { 
        //   employees : [
        //     // { id: 101, name: 'Jay', address: 'Pune', mobileNumber: '242342', salary: 10000 },
        //     // { id: 102, name: 'AJay', address: 'Kune', mobileNumber: '44232', salary: 20000 },
        //     // { id: 103, name: 'VJay', address: 'June', mobileNumber: '44444', salary: 10000 },
        //     // { id: 104, name: 'SanJay', address: 'Mune', mobileNumber: '666666', salary: 12000 }
        //   ],
        //   showMsg : false
        };
    }
    
    // componentDidMount() {
    //     fetch("http://localhost:4000/employees")
    //       .then(res => res.json())
    //       .then(
    //         (result) => {
    //           this.list = [...result];
    //           this.setState({
    //             isLoaded: true,
    //             employees: result
    //           });
    //         },
    //         (error) => {
    //           this.setState({
    //             isLoaded: false,
    //             employees : []
    //           });
    //         }
    //       )
    //   }
    
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

    // deleteEmployee = (id) => {
    //    fetch("http://localhost:4000/employees/" + id, {
    //         method: 'DELETE',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         }
    //     }).then(response => response.json())
    //     .then(
    //         (result) => {
    //             this.showToastMsg('Deleted successfully!', 'success');
    //             this.setState(prevState => {
    //                 return { 
    //                     employees: prevState.employees.filter(value => value.id !== id),
    //                     showMsg: true 
    //                 };
    //             });
    //         },
    //         (error) => {
    //             console.log(error);
    //             this.showToastMsg('Failed to delete!', 'danger');
    //         }
    //     );
    // }

    // searchFilter = (searchString) => {
    //     this.setState({ employees: this.props.employees.filter(obj => {
    //         return Object.values(obj).some(val => {
    //             // val = "" + val; // convert to string
    //             return (!searchString) ? true : val.toString().includes(searchString);                        
    //             });
    //         })
    //     });
    // }

    // showToastMsg = (msg, msgType) => {
    //     this.toastProps = {
    //         showMsg: true,
    //         msgType,
    //         message: msg,
    //         callback: () => this.setState({showMsg: false})
    //     }
    // }

    render() {
        const tableHeaders = ['Name', 'Address', 'Phone_Number', 'Salary', 'Emp_Id', 'Actions'];
        const tableHeaderTemplate = tableHeaders.map((headerName, index) => 
            empColumn(headerName, '' , index + 1)
        );

        return <div>
            <h4 className="text-center"> List of Employees</h4>
            <div className="container">
                {/* {this.state.showMsg && <ToastMsg {...this.toastProps}></ToastMsg>} */}
                <div className="row"> 
                    <div className="col-sm">
                        <NavLink to="/employees/add-edit-employee"> <button className="fa fa-plus btn btn-primary"> Add Employee</button></NavLink>
                    </div>
                    <div className="col-sm">
                    {/*  Create new component */}
                        <input type="text" className="form-control" value={this.props.searchString} onChange={(event) => this.props.searchBy(event.target.value)} 
                            placeholder="Search here"/> 
                    </div>
                </div>
                <br/>
                <div className="row">
                    {tableHeaderTemplate}
                </div>
                <EmpTableRows employees={this.props.employees} deleteEmployee={this.props.deleteEmployee}></EmpTableRows>
            </div>
        </div>;
    }
} 

const mapStateToProps = (state, ownProps) => ({
    employees: searchFilter(state.employees, state.filterValue),
    searchString: state.filterValue
});

const searchFilter = (list, searchString) => {
    return list.filter(obj => {
        return Object.values(obj).some(val => {
            // val = "" + val; // convert to string
            return (!searchString) ? true : val.toString().toLowerCase().includes(searchString);                        
            });
    });
}

const mapDispatchToProps = (dispatch, ownProps) => {
    console.log('ownProps', ownProps);
    return {
        deleteEmployee: (id) => {
            dispatch(actions.DELETE_EMP(id));
            dispatch(actions.SHOW_TOAST_MSG({msgType: 'success', message:'Deleted successfully!'}));
        },
        searchBy: (value) => dispatch({type: 'EMP_SEARCH_BY', value: value})
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EmpList);