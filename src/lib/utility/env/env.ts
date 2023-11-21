import { EnvOptions, EnvValues } from './env.values';

export function getEnvValue(key: EnvOptions): string {
    const value = EnvValues[key];
    if (value === undefined) {
        throw new Error(
            `Couldn't find or invalid environment variable: ${key}`,
        );
    }
    return value;
}
