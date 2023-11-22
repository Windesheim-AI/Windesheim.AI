import { useDataFetcher, fetchJsonData } from './DataFetcher';
import { appConfig } from '../../../app.config';
import { Prompt } from '../../types/Prompt';
import { getEnvValue } from '../utility/env/env';
import { EnvOptions } from '../utility/env/env.values';

// mock
import * as mock from '../../assets/promptLibrary/mock.json';

export default function usePromptLibrary() {
    return useDataFetcher<Prompt[]>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/winpl/v1/prompts/',
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
