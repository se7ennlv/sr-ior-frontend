export interface Employee {
    photo?: null | string;
    fname?: string;
    lname?: null | string;
    job_title?: string;
    dept_code?: any;
    dept_name?: string;
    number_plate?: string;
}

export interface Datum {
    id?: string;
    emp_id?: string;
    zone?: string;
    number_plate?: string;
    reason?: string;
    record_date?: Date | string;
    record_time?: Date | string;
    curfew_from?: Date | string;
    curfew_to?: Date | string;
    employee?: Employee;
}

export interface RecordItem {
    status?: string;
    data?: Datum[];
}
