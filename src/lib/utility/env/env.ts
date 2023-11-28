import { EnvOptions, EnvValues, mockEnvValues } from './env.values';

export function getEnvValue(key: EnvOptions, mock = false): string {
    const value = mock ? mockEnvValues[key] : EnvValues[key];
    if (value === undefined) {
        let str = '';
        for (const envKey in EnvValues) {
            str += `\n${envKey}: ${EnvValues[envKey]}`;
        }
        throw new Error(
            `Couldn't find or invalid environment variable: ${key} current env values ${str}`,
        );
    }
    return value;
}
