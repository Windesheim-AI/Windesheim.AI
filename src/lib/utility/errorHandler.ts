import { appConfig } from '../../../app.config';

export function handleError(error: any) {
    if (!appConfig.debug) {
        return;
    }

    // eslint-disable-next-line no-console
    console.error(error);
    throw error;
}
