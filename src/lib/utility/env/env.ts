import { EnvOptions, EnvValues, mockEnvValues } from './env.values';

export function getEnvValue(key: EnvOptions, mock = false): string {
    const value = mock ? mockEnvValues[key] : EnvValues[key];
    if (value === undefined) {
        throw new Error(
            `Couldn't find or invalid environment variable: ${key}`,
        );
    }
    return value;
}
