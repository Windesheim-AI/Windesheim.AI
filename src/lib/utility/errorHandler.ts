import { getEnvValue } from './env/env';
import { EnvOptions } from './env/env.values';

export function handleError(error: any) {
    if (getEnvValue(EnvOptions.AppDebug) !== 'true') {
        return;
    }

    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
}
