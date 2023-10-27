import Translator from './Translator';

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
            `https://translation.googleapis.com/language/translate/v2?source=${this.from}&target=${this.to}&key=${this.apiKey}&q=${value}&format=text`,
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { data } = await response.json();

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-return
        return data.translations[0]?.translatedText;
    }
}
