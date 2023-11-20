/* eslint @typescript-eslint/no-unsafe-assignment: 0 */

import {
    EXPO_PUBLIC_GTR_API_KEY,
    OPENAI_API_KEY,
    AI_ENABLED,
    WP_USERNAME,
    WP_PASSWORD,
    // @ts-ignore
} from '@env';

export const EnvValues: {
    WordPressUsername: string | undefined;
    AiEnabled: string | undefined;
    OpenAIApiKey: string | undefined;
    GoogleTranslateApiKey: string | undefined;
    WordPressPassword: string | undefined;
} = {
    GoogleTranslateApiKey: EXPO_PUBLIC_GTR_API_KEY,
    OpenAIApiKey: OPENAI_API_KEY,
    AiEnabled: AI_ENABLED,
    WordPressUsername: WP_USERNAME,
    WordPressPassword: WP_PASSWORD,
};
