import CacheTranslator from './CacheTranslator';
import GoogleTranslator from './GoogleTranslator';
import IdenticalTranslator from './IdenticalTranslator';
import Translator from './Translator';
import { CacheProvider, TranslationOptions } from '../Types';

export default class TranslatorFactory {
    create(
        options: TranslationOptions,
        cacheProvider?: CacheProvider,
    ): Translator {
        if (options.to === options.from) {
            return new IdenticalTranslator(options);
        }

        if (cacheProvider) {
            return new CacheTranslator(options, cacheProvider);
        }

        return new GoogleTranslator(options);
    }
}

export const translatorFactory = new TranslatorFactory();
