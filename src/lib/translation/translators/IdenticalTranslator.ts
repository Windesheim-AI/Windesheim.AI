import Translator from './Translator';

export default class IdenticalTranslator extends Translator {
    translate(value: string): Promise<string | undefined> {
        return new Promise((resolve): void => {
            resolve(value);
        });
    }
}
