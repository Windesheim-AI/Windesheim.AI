import { getEnvValue } from '../../../../../src/lib/utility/env/env';
import { EnvOptions } from '../../../../../src/lib/utility/env/env.values';

describe('getEnvValue when undefined', () => {
    it('should throw error for missing or invalid environment variable', () => {
        expect(() =>
            getEnvValue('ThisDoesNotExist' as EnvOptions, true),
        ).toThrow(
            "Couldn't find or invalid environment variable: " +
                'ThisDoesNotExist',
        );
    });
});
