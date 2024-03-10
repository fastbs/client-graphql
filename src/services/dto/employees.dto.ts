import type { CompanyDto } from "./companies.dto";

export interface CreateEmployeeDto {
  name: string,
  name_short?: string,
  company: CompanyDto,
}

export interface EmployeeDto extends CreateEmployeeDto{
    _id: string,
    user?: string
}

export interface ListEmployeeDto {
  _id?: string;
  name?: string;
  name_short?: string;
  company?: CompanyDto;
}
