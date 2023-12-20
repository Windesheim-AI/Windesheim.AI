import { isEnvSettingEnabled } from './env/env';
import { EnvOptions } from './env/env.values';

export function handleError(error: any) {
    if (isEnvSettingEnabled(EnvOptions.AppDebug)) {
        return;
    }

    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
}
