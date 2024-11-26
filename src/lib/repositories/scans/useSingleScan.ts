import { Scan } from '../../../types/Scan';
import { useDataFetcher, fetchJsonData } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function useSingleScan(id: string | undefined) {
    return useDataFetcher<Scan>(fetchJsonData, {
        url:
            getEnvValue(EnvOptions.WordPressDataURL) +
            'wp-json/wins/v1/app/scans/' +
            id,
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
