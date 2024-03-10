export interface ApolloErrorDto {
    tag: string,
    message?: string,
    code?: number,
    serverMessage?: string,
    operation?: string,
}