import { ScanQuestion } from '../../../types/Scan';
import { useDataFetcher, fetchJsonData } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function useScanQuestionRange(ids: string[]) {
    return useDataFetcher<ScanQuestion[]>(fetchJsonData, {
        url:
            getEnvValue(EnvOptions.WordPressDataURL) +
            '/wp-json/wins/v1/app/questions/' +
            ids.join(','),
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
