import SERVER_CONSTANT from '../server-constants';

function EmployeeService() {
    const serverURL = SERVER_CONSTANT.MY_JSON_SERVER;
    // const serverURL = SERVER_CONSTANT.LOCAL_SERVER;


    const service = {
        getEmployees : () => fetch(serverURL + "/employees").then(res => res.json()),
        deleteEmployee : (id) => fetch(serverURL + "/employees/" + id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => response.json()),
        getEmployee : (id) => fetch(serverURL + "/employees/" + id).then(res => res.json()),
        addUpdateEmp : (method, data, id) => {
            const url = serverURL + "/employees" + (id ? '/' + id : '');
            return fetch(url, {
                method: method,
                // mode: 'cors',
                headers:{
                    'Content-Type': 'application/json',
                },
                body: data
            }).then(res => res.json())
        }

    }
    return service;
}

export default EmployeeService();