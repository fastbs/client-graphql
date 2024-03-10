import { acQuery, acMutation } from "./ApolloClient";
import type { CompanyDto } from "./dto/companies.dto";
import type { JobTitleDto, ListJobTitleDto, CreateJobTitleDto } from "./dto/jobtitles.dto";
import { CREATE_JOB_TITLE, GET_JOB_TITLES, SAVE_JOB_TITLES, DELETE_JOB_TITLE } from "./queries/GraphqlQueries";


export default {
  async create(payload: CreateJobTitleDto): Promise<JobTitleDto | undefined> {
    const result = await acMutation(CREATE_JOB_TITLE, { payload: payload });
    return result ? result.data.createJobTitle as JobTitleDto : undefined;

  },

  async save(payload: JobTitleDto[]): Promise<JobTitleDto[] | undefined> {
    const result = await acMutation(SAVE_JOB_TITLES, { payload: payload });
    return result ? result.data.saveJobTitles as JobTitleDto[] : undefined;
  },

  async fetch(filters: ListJobTitleDto | null = null): Promise<{ jobTitles: JobTitleDto[], companies: CompanyDto[] } | undefined> {
    const result = await acQuery(GET_JOB_TITLES, { filters: filters });
    return result ? result.data as { jobTitles: JobTitleDto[], companies: CompanyDto[] } : undefined;
  },

  async delete(_id: string): Promise<JobTitleDto | undefined> {
    const result = await acMutation(DELETE_JOB_TITLE, { _id: _id });
    return result ? result.data.deleteJobTitle as JobTitleDto : undefined;
  }

};
