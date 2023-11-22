import { appConfig } from '../../../app.config';

export function handleError(error: Error | string) {
    if (!appConfig.debug) {
        return;
    }

    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
}
