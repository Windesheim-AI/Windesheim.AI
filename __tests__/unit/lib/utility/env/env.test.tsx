import { getEnvValue } from '../../../../../src/lib/utility/env/env';
import { EnvOptions } from '../../../../../src/lib/utility/env/env.values';

describe('getEnvValue', () => {
    it('should get GoogleTranslateApiKey', () => {
        const result = getEnvValue(EnvOptions.GoogleTranslateApiKey, true);
        expect(result).toBe('mockGoogleTranslateApiKey');
    });

    it('should get OpenAIApiKey', () => {
        const result = getEnvValue(EnvOptions.OpenAIApiKey, true);
        expect(result).toBe('mockOpenAIApiKey');
    });

    it('should get AiEnabled', () => {
        const result = getEnvValue(EnvOptions.AiEnabled, true);
        expect(result).toBe('true');
    });

    it('should get WordPressUsername', () => {
        const result = getEnvValue(EnvOptions.WordPressUsername, true);
        expect(result).toBe('mockUsername');
    });

    it('should get WordPressPassword', () => {
        const result = getEnvValue(EnvOptions.WordPressPassword, true);
        expect(result).toBe('mockPassword');
    });
});
