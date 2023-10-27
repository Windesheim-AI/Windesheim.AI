import GoogleTranslator from './GoogleTranslator';

export default class CacheTranslator extends GoogleTranslator {
    async translate(value: string): Promise<string | undefined> {
        let translation = await this.cacheProvider?.get(this.to, value);

        if (!translation) {
            translation = await this.tryGetGoogleTranslationAndCache(value);
        }

        return translation;
    }

    async tryGetGoogleTranslationAndCache(
        value: string,
    ): Promise<string | undefined> {
        const translation = await this.tryGetGoogleTranslation(value);

        await this.setCachedTranslationForValue(value, translation);
        return translation;
    }

    async setCachedTranslationForValue(
        value: string,
        translation?: string,
    ): Promise<void> {
        if (!translation) {
            return;
        }

        await this.cacheProvider?.set(this.to, value, translation);
    }
}
