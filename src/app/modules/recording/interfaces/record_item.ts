export interface RecordItem {
    status?: string;
    data?: Item;
}

export interface Item {
    id?: string;
    created_at?: string;
    employee?: Employee;
}

export interface Employee {
    emp_id?: string;
    photo?: string;
    fname?: string;
    lname?: string;
    job_title?: string;
    dept_id?: number;
    dept_name?: string;
    joined_date?: any;
    number_plate?: string;
}
