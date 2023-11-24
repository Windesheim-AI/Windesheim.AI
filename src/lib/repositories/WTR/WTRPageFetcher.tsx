import { appConfig } from '../../../../app.config';
import { fetchJsonData, useDataFetcher } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

interface PageData {
    content: {
        rendered: string;
    };
}

export const useFetchWTRPage = (page: string) => {
    const { data, isLoading } = useDataFetcher<PageData[]>(fetchJsonData, {
        url:
            getEnvValue(EnvOptions.WordPressURL) +
            '/wp-json/wp/v2/pages?slug=' +
            page,
    });

    let content = '';
    if (Array.isArray(data) && data.length > 0) {
        content = data[0]?.content?.rendered;
    }

    return { content, hasContent: content?.length > 1, isLoading };
};
