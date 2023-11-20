import { EnvValues } from './env.values';

export enum EnvOptions {
    GoogleTranslateApiKey,
    OpenAIApiKey,
    AiEnabled,
    WordPressUsername,
    WordPressPassword,
}

export function getEnvValue(key: EnvOptions): string {
    let envValue: string | null | undefined = null;
    let envKey = '';

    switch (key) {
        case EnvOptions.GoogleTranslateApiKey:
            envValue = EnvValues.GoogleTranslateApiKey;
            envKey = 'EXPO_PUBLIC_GTR_API_KEY';
            break;
        case EnvOptions.OpenAIApiKey:
            envValue = EnvValues.OpenAIApiKey;
            envKey = 'OPENAI_API_KEY';
            break;
        case EnvOptions.AiEnabled:
            envValue = EnvValues.AiEnabled;
            envKey = 'AI_ENABLED';
            break;
        case EnvOptions.WordPressUsername:
            envValue = EnvValues.WordPressUsername;
            envKey = 'WP_USERNAME';
            break;
        case EnvOptions.WordPressPassword:
            envValue = EnvValues.WordPressPassword;
            envKey = 'WP_PASSWORD';
            break;
        default:
            throw new Error(`Unsupported environment variable: ${key}`);
    }

    if (typeof envValue !== 'string' || envValue === '') {
        throw new Error(
            `Couldn't find or invalid environment variable: ${envKey}`,
        );
    }

    return envValue;
}
