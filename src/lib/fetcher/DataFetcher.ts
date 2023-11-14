import useSWRNative from '@nandorojo/swr-react-native';
import { BareFetcher, Fetcher, SWRConfiguration } from 'swr';

import { HttpStatusCode } from '../../types/Response';

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
        throw new Error('An error occurred while fetching the data.');
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

    // The headers are merged with the payload headers.
    const headers: HeadersInit = {
        ...payload.headers,
        ...(bearerToken.length > 0 && {
            Authorization: `Bearer ${bearerToken}`,
        }),
        ...(username.length > 0 &&
            password.length > 0 && {
                Authorization: `Basic ${btoa(`${username}:${password}`)}`,
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
