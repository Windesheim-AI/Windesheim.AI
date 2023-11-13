import Translator from './Translator';
import { getTranslateApiUrl, isTranslationInBlacklist } from '../Config';

export default class GoogleTranslator extends Translator {
    async translate(value: string): Promise<string | undefined> {
        if (value.length < 1 || isTranslationInBlacklist(value)) {
            return value;
        }

        return await this.tryGetGoogleTranslation(value);
    }

    async tryGetGoogleTranslation(value: string): Promise<string | undefined> {
        try {
            return await this.fetchGoogleTranslation(value);
        } catch (e) {
            console.error(e);
            return undefined;
        }
    }

    async fetchGoogleTranslation(value: string): Promise<string | undefined> {
        const response = await fetch(getTranslateApiUrl(this, value));
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return data?.translations[0]?.translatedText ?? undefined;
    }
}
