import { Prompt } from '../../../types/Prompt';
import { useDataFetcher, fetchJsonData } from '../../fetcher/DataFetcher';
import { getEnvValue } from '../../utility/env/env';
import { EnvOptions } from '../../utility/env/env.values';

export default function useSinglePrompt(id: string) {
    return useDataFetcher<Prompt>(fetchJsonData, {
        url:
            getEnvValue(EnvOptions.WordPressDataURL) +
            '/wp-json/winpl/v1/prompts/' +
            id,
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
