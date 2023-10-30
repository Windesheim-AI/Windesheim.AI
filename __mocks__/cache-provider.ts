import { CacheProvider } from '../src/lib/translation/Types';

class MockCacheProvider implements CacheProvider {
    cache: Record<string, Record<string, string>>;

    constructor() {
        this.cache = {
            fr: {
                'My menu': 'Mon menu',
            },
        };
    }

    get(language: string, key: string): Promise<string | undefined> {
        return new Promise((resolve): void => {
            resolve(this.cache[language][key]);
        });
    }

    set(language: string, key: string, translation: string): Promise<void> {
        return new Promise((resolve): void => {
            this.cache[language] = { [key]: translation };
            resolve();
        });
    }
}

export default MockCacheProvider;
