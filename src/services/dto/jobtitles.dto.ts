import type { CompanyDto } from "./companies.dto";

export interface CreateJobTitleDto {
    name?: string,
    name_short?: string,
    company?: CompanyDto,
  }

export interface JobTitleDto extends CreateJobTitleDto {
    _id?: string,
    user?: string
}

export interface ListJobTitleDto {
    _id?: string;
    name?: string;
    name_short?: string;
    company?: CompanyDto;
  }
