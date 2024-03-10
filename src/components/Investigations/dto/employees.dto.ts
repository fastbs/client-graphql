export type EmployeesTableItemDto = {
    //isActive: boolean, 
    employee: string,
    //employee_name: string,
    job_title: string,
    //job_title_name: string,
    basis: string,
    starts_at: Date,
    ends_at: Date,
};

 export type EmployeeField = {
    employee: string,
    job_title: string,
    basis: string,
    starts_at: Date,
    ends_at: Date,
}
/*
export class EmployeeField {
    employee_id = "";
    position = "";
    basis = "";
    starts_at = "";
    ends_at = "";
}
*/