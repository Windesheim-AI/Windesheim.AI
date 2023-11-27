import useSWRNative from '@nandorojo/swr-react-native';
import { BareFetcher, Fetcher, SWRConfiguration } from 'swr';

import { HttpStatusCode } from '../../types/Response';
import { handleError } from '../utility/errorHandler';
import { stringToBase64 } from '../utility/stringutils';

interface FetcherOptions {
    input: RequestInfo | URL | string;
    init: RequestInit;
}

export const fetchData = async (options: FetcherOptions) => {
    const response = await fetch(options.input, options.init);

    if (response.status === HttpStatusCode.NotFound.valueOf()) {
        return undefined;
    }

    if (response.status !== HttpStatusCode.Ok.valueOf()) {
        const result: object = (await response.json()) as object;
        handleError(new Error(JSON.stringify(result)));
    }

    return response;
};

export const fetchJsonData = async (options: FetcherOptions) => {
    return (await fetchData(options))?.json();
};

export const fetchBlobData = async (options: FetcherOptions) => {
    return (await fetchData(options))?.blob();
};

/**
 * The input for the SWR hook.
 */
export interface SwrRequestInput {
    url: string | URL | RequestInfo;
    payload?: RequestInit;
    bearerToken?: string;
    password?: string;
    username?: string;
}

/**
 * A wrapper for the SWR hook, which uses the immutable data fetching.
 */
export const useDataFetcher = <DataType>(
    dataFetcher: BareFetcher<DataType> | Fetcher<DataType> | null,
    options: SwrRequestInput,
    config: SWRConfiguration = {},
) => {
    // Default values for the request input
    const {
        url,
        payload = {},
        bearerToken = '',
        username = '',
        password = '',
    } = options;

    const hasBasicAuthCredentials = username.length > 0 && password.length > 0;
    // The headers are merged with the payload headers.
    const headers: HeadersInit = {
        ...payload.headers,
        ...(bearerToken.length > 0 && {
            Authorization: `Bearer ${bearerToken}`,
        }),
        ...(hasBasicAuthCredentials && {
            Authorization: `Basic ${stringToBase64(`${username}:${password}`)}`,
        }),
    };

    // Prepare the fetcher options for the SWR hook.
    const fetcherOptions: FetcherOptions = {
        input: url,
        init: {
            ...payload,
            headers,
        },
    };

    // Use the SWR hook with the prepared fetcher options.
    return useSWRNative<DataType, Error>(fetcherOptions, dataFetcher, {
        shouldRetryOnError: false,
        ...config,
    });
};
