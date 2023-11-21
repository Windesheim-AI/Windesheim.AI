import { getEnvValue } from '../../../../../src/lib/utility/env/env';
import { EnvOptions } from '../../../../../src/lib/utility/env/env.values';

// Mock the ./env.values module
jest.mock('../../../../../src/lib/utility/env/env.values.ts', () => ({
    EnvValues: {
        GoogleTranslateApiKey: undefined,
        OpenAIApiKey: 'mockOpenAIApiKey',
        AiEnabled: 'true',
        WordPressUsername: 'mockUsername',
        WordPressPassword: 'mockPassword',
    },
}));

describe('getEnvValue when undefined', () => {
    it('should throw error for missing or invalid environment variable', () => {
        expect(() =>
            getEnvValue(EnvOptions.GoogleTranslateApiKey),
        ).toThrowError(
            "Couldn't find or invalid environment variable: EXPO_PUBLIC_GTR_API_KEY",
        );
    });
});
