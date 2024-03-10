import { acQuery, acMutation } from "./ApolloClient";
import type { CompanyDto, CreateCompanyDto, ListCompanyDto } from "./dto/companies.dto";
import { CREATE_COMPANY, SAVE_COMPANIES, GET_COMPANIES, DELETE_COMPANY } from "@/services/queries/GraphqlQueries";


export default {
  async create(payload: CreateCompanyDto): Promise<CompanyDto | undefined> {
    const result = await acMutation(CREATE_COMPANY, { payload: payload });
    return result ? result.data.createCompany as CompanyDto : undefined;
  },

  async save(payload: CompanyDto[]): Promise<CompanyDto[] | undefined> {
    const result = await acMutation(SAVE_COMPANIES, { payload: payload });
    return result ? result.data.saveCompanies as CompanyDto[] : undefined;
  },

  async fetch(filters: ListCompanyDto | null = null): Promise<CompanyDto[] | undefined> {
    const result = await acQuery(GET_COMPANIES, { filters: filters });
    return result ? result.data.companies as CompanyDto[] : undefined;
  },

  async delete(_id: string): Promise<CompanyDto | undefined> {
    const result = await acMutation(DELETE_COMPANY, { _id: _id });
    return result ? result.data.deleteCompany as CompanyDto : undefined;
  }

  /*
      update (id, params) {
        return api().put(`posts/${id}`, params, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      },
 */

};
