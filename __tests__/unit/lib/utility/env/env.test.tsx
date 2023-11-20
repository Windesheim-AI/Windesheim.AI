import {
    EnvOptions,
    getEnvValue,
} from '../../../../../src/lib/utility/env/env';

// Mock the ./env.values module
jest.mock('../../../../../src/lib/utility/env/env.values.ts', () => ({
    EnvValues: {
        GoogleTranslateApiKey: 'mockGoogleTranslateApiKey',
        OpenAIApiKey: 'mockOpenAIApiKey',
        AiEnabled: 'true',
        WordPressUsername: 'mockUsername',
        WordPressPassword: 'mockPassword',
    },
}));

describe('getEnvValue', () => {
    it('should get GoogleTranslateApiKey', () => {
        const result = getEnvValue(EnvOptions.GoogleTranslateApiKey);
        expect(result).toBe('mockGoogleTranslateApiKey');
    });

    it('should get OpenAIApiKey', () => {
        const result = getEnvValue(EnvOptions.OpenAIApiKey);
        expect(result).toBe('mockOpenAIApiKey');
    });

    it('should get AiEnabled', () => {
        const result = getEnvValue(EnvOptions.AiEnabled);
        expect(result).toBe('true');
    });

    it('should get WordPressUsername', () => {
        const result = getEnvValue(EnvOptions.WordPressUsername);
        expect(result).toBe('mockUsername');
    });

    it('should get WordPressPassword', () => {
        const result = getEnvValue(EnvOptions.WordPressPassword);
        expect(result).toBe('mockPassword');
    });
});
