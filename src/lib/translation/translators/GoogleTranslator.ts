import Translator from './Translator';
import { getTranslateApiUrl } from '../Config';

export default class GoogleTranslator extends Translator {
    async translate(value: string): Promise<string | undefined> {
        return await this.tryGetGoogleTranslation(value);
    }

    async tryGetGoogleTranslation(value: string): Promise<string | undefined> {
        try {
            return await this.fetchGoogleTranslation(value);
        } catch (e) {
            return undefined;
        }
    }

    async fetchGoogleTranslation(value: string): Promise<string> {
        const response = await fetch(
            getTranslateApiUrl(this.to, this.from, this.apiKey, value),
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return data.translations[0]?.translatedText;
    }
}
