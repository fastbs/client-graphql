import { acQuery, acMutation } from "./ApolloClient";
import type { CompanyDto } from "./dto/companies.dto";
import type { CreateEmployeeDto, EmployeeDto, ListEmployeeDto } from "./dto/employees.dto";
import { CREATE_EMPLOYEE, SAVE_EMPLOYEES, GET_EMPLOYEES, DELETE_EMPLOYEE } from "./queries/GraphqlQueries";


export default {
  async create(payload: CreateEmployeeDto): Promise<EmployeeDto | undefined> {
    const result = await acMutation(CREATE_EMPLOYEE, { payload: payload });
    return result ? result.data.createEmployee as EmployeeDto : undefined;
  },

  async save(payload: EmployeeDto[]): Promise<EmployeeDto[] | undefined> {
    const result = await acMutation(SAVE_EMPLOYEES, { payload: payload });
    return result ? result.data.saveEmployees as EmployeeDto[] : undefined;
  },

  async fetch(filters: ListEmployeeDto | null = null): Promise<{ employees: EmployeeDto[], companies: CompanyDto[] } | undefined> {
    const result = await acQuery(GET_EMPLOYEES, { filters: filters });
    return result ? result.data as { employees: EmployeeDto[], companies: CompanyDto[] } : undefined;
  },

  async delete(_id: string): Promise<EmployeeDto | undefined> {
    const result = await acMutation(DELETE_EMPLOYEE, { _id: _id });
    return result ? result.data.deleteEmployee as EmployeeDto : undefined;
  }

};
