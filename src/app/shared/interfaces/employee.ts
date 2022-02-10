export interface EmployeeModel {
    status: string;
    data: Employee;
}

export interface Employee {
    emp_id: string;
    photo: string;
    fname: string;
    lname: string;
    job_title: string;
    dept_code: null | string;
    dept_name: string;
    number_plate: string;
}
