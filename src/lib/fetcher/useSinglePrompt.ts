/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useDataFetcher, fetchJsonData } from './DataFetcher';
import { appConfig } from '../../../app.config';
import { Prompt } from '../../types/Prompt';
import { getEnvValue } from '../utility/env/env';
import { EnvOptions } from '../utility/env/env.values';
import * as mock from '../../assets/promptLibrary/mock.json'

export default function useSinglePrompt(id: string) {
    return useDataFetcher<Prompt>(fetchJsonData, {
        url: appConfig.backendUrl + '/wp-json/winpl/v1/prompts/' + id,
        username: getEnvValue(EnvOptions.WordPressUsername),
        password: getEnvValue(EnvOptions.WordPressPassword),
    });
}
