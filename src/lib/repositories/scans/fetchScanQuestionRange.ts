import { fetchJsonData } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';
import { stringToBase64 } from '../../utility/stringutils';

export default function fetchScanQuestionRange(ids: string[]) {
    const username = getEnvValue(EnvOptions.WordPressUsername);
    const password = getEnvValue(EnvOptions.WordPressPassword);

    return fetchJsonData({
        input:
            getEnvValue(EnvOptions.WordPressDataURL) +
            'wp-json/wins/v1/app/questions/' +
            ids.join(','),
        init: {
            headers: {
                Authorization: `Basic ${stringToBase64(`${username}:${password}`)}`,
            },
        },
    });
}
