import type { GraphQLError } from "graphql";
import { ApolloClient, ApolloLink, HttpLink, ApolloError, InMemoryCache, from } from "@apollo/client/core";
import type { QueryOptions, DefaultContext, ApolloQueryResult, DocumentNode, OperationVariables } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { v4 as uuidv4 } from 'uuid';

import type { ApolloErrorDto } from "./dto/apolloErrors.dto";
import { useMainStore } from "@/store/MainStore";


const httpLink = new HttpLink({
    uri: "http://localhost:4400/graphql", //`${import.meta.env.VITE_API_URL}/graphql`,
    includeExtensions: true,
    /*     fetch: (uri: RequestInfo, options: RequestInit) => {
    
            console.log(">>> options before: ", options)
            console.log(">>> headers before: ", options.headers)
    
                      //const at: { [key: string]: string; } = {};
                    const at = options;
                    at.headers ??= {};
                    at.headers.authorization="123";
            
                    const token = window.localStorage.getItem("auth");
                    if (token) {
                        at["Authorization"] = `Bearer ${token}`;
                    }
                    at["mytag"] = "header from headersLink";
    
            return fetch(uri, options);
        }, */
});


const errorLink = onError(({ operation, response, graphQLErrors, networkError }) => {
    const ctx = operation.getContext();
    const store = useMainStore();

    if (graphQLErrors) {
        graphQLErrors.forEach(el => {
            let ae: ApolloErrorDto = {
                tag: el.extensions.tag as string,
                message: el.message,
                code: el.extensions.code as number,
                serverMessage: el.extensions.message as string,
                operation: operation.operationName,
            }
            store.addApolloError(ae);
        })
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        /*         let ae: ApolloErrorDto = {
                    tag: el.extensions.tag as string,
                    message: el.message,
                    code: el.extensions.code as number,
                    serverMessage: el.extensions.message as string,
                    operation: operation.operationName,
                }
                store.addApolloError(ae); */

        //networkError.result.
    }
});

const roundTripLink = new ApolloLink((operation, forward) => {
    operation.setContext({ start: new Date() });

    return forward(operation).map((data) => {
        const time = +new Date() - operation.getContext().start;
        console.log(`*** Operation ${operation.operationName} took ${time} ms to complete`);
        return data;
    });

});

const headersLink = new ApolloLink((operation, forward) => {
    let ctx = operation.getContext();
    ctx.headers ??= {};

    const token = window.localStorage.getItem("auth");
    if (token) {
        ctx.headers.authorization = `Bearer ${token}`;
    }

    operation.setContext({
        headers: ctx.headers, //at,
    });

    return forward(operation);
})

export const apolloClient = new ApolloClient({
    cache: new InMemoryCache({
        addTypename: false
    }),
    link: from([
        roundTripLink,
        headersLink,
        errorLink,
        httpLink,
    ]),
    defaultOptions: {
        query: {
            errorPolicy: "all",
        },
        mutate: {
            errorPolicy: "all",
        },
    },
});




export async function acQuery(q: DocumentNode, v: OperationVariables | undefined = undefined) {
    let dc: DefaultContext = { headers: { "tag": uuidv4() } };

    return await apolloClient.query({
        query: q,
        variables: v,
        context: dc,
        fetchPolicy: 'network-only',
    });
};

export async function acMutation(m: any, v: any) {
    let dc: DefaultContext = { headers: { "tag": uuidv4() } };

    return await apolloClient.mutate({
        mutation: m,
        variables: v,
        context: dc,
    });
};



export function processError(error: ApolloError | GraphQLError, tag: string) {
    //console.log("processError: ", error);
    //console.log("tag: ", tag);

    let ae = useMainStore().getApolloError(tag, true);

    const err = new Error;
    if (ae) {
        err.message = `Error in ${ae.operation} !
              Code: ${ae.code}
              Message: ${ae.message}
              `;
    } else {
        err.message = "Error! " + error.message;
    }

    useMainStore().addToast({ severity: 'error', summary: 'Ошибка', detail: err.message, life: 5000 });

    return err;
}

export function processErrors(result: any, tag: string): boolean {
    let ret = false;
    if (result.error) {
        processError(result.error as ApolloError, tag);
        ret = true;
    }
    if (result.errors) {
        const ge = result.errors as ReadonlyArray<GraphQLError>;
        ge.forEach(el => processError(el, tag));
        ret = true;
    }
    return ret;
}
