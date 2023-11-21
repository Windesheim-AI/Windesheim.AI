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
    GoogleTranslateApiKey,
    OpenAIApiKey,
    AiEnabled,
    WordPressUsername,
    WordPressPassword,
}

export type Env = Record<EnvOptions, string | undefined>;

export const EnvValues: Env = {
    [EnvOptions.GoogleTranslateApiKey]: EXPO_PUBLIC_GTR_API_KEY,
    [EnvOptions.OpenAIApiKey]: OPENAI_API_KEY,
    [EnvOptions.AiEnabled]: AI_ENABLED,
    [EnvOptions.WordPressUsername]: WP_USERNAME,
    [EnvOptions.WordPressPassword]: WP_PASSWORD,
};
