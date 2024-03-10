export interface CreateCompanyDto {
    name?: string,
    name_short?: string,
    inn?: string,
}

export interface CompanyDto extends CreateCompanyDto {
    _id?: string,
    user?: string
}

export interface ListCompanyDto {
    _id?: string;
    name?: string;
    name_short?: string;
    inn?: string;
  }

//export interface CompanyDto extends CreateCompanyDto {
//};
