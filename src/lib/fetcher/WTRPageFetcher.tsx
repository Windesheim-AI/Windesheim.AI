import { appConfig } from '../../../app.config';

import { fetchJsonData, useDataFetcher } from './DataFetcher';

interface PageData {
    content: {
        rendered: string;
    };
}

export const useFetchWTRPage = (page: string) => {
    const { data, error, isLoading, isValidating, mutate } = useDataFetcher<
        PageData[]
    >(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/wp/v2/pages?slug=' + page,
    });

    let content = '';
    if (Array.isArray(data) && data.length > 0) {
        content = data[0]?.content?.rendered;
    }

    return { content, hasContent: content?.length > 1, isLoading };
};
