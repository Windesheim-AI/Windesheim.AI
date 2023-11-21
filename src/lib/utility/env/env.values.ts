/* eslint @typescript-eslint/no-unsafe-assignment: 0 */

import {
    EXPO_PUBLIC_GTR_API_KEY,
    OPENAI_API_KEY,
    AI_ENABLED,
    WP_USERNAME,
    WP_PASSWORD,
    // @ts-ignore
} from '@env';

export enum EnvOptions {
    GoogleTranslateApiKey = 'GoogleTranslateApiKey',
    OpenAIApiKey = 'OpenAIApiKey',
    AiEnabled = 'AiEnabled',
    WordPressUsername = 'WordPressUsername',
    WordPressPassword = 'WordPressPassword',
}

export type Env = Record<EnvOptions, string | undefined>;

export const mockEnvValues: Env = {
    [EnvOptions.GoogleTranslateApiKey]: 'mockGoogleTranslateApiKey',
    [EnvOptions.OpenAIApiKey]: 'mockOpenAIApiKey',
    [EnvOptions.AiEnabled]: 'true',
    [EnvOptions.WordPressUsername]: 'mockUsername',
    [EnvOptions.WordPressPassword]: 'mockPassword',
};

export const EnvValues: Env = {
    [EnvOptions.GoogleTranslateApiKey]: EXPO_PUBLIC_GTR_API_KEY,
    [EnvOptions.OpenAIApiKey]: OPENAI_API_KEY,
    [EnvOptions.AiEnabled]: AI_ENABLED,
    [EnvOptions.WordPressUsername]: WP_USERNAME,
    [EnvOptions.WordPressPassword]: WP_PASSWORD,
};
