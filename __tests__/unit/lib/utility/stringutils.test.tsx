import {
    removeConsecutiveSlashes,
    stringToBase64,
    truncate,
} from '../../../../src/lib/utility/stringutils';

describe('truncate utility function', () => {
    it('should truncate a string longer than the specified length', () => {
        const longText = 'This is a long text that needs to be truncated.';
        const truncatedText: string = truncate(longText, 20);
        expect(truncatedText).toBe('This is a long text...');
    });

    it('should not truncate a string shorter than the specified length', () => {
        const shortText = 'Short';
        const truncatedText: string = truncate(shortText, 10);
        expect(truncatedText).toBe(shortText);
    });

    it('should handle an empty string', () => {
        const emptyString = '';
        const truncatedText: string = truncate(emptyString, 5);
        expect(truncatedText).toBe(emptyString);
    });

    it('should handle a string of the exact specified length', () => {
        const text = 'ExactlyFive';
        const truncatedText: string = truncate(text, 6); // Truncate to a shorter length
        expect(truncatedText).toBe('Exact...'); // The expected truncated result
    });
});

describe('base64Encode utility function', () => {
    it('can encode a string', () => {
        const text = 'ExactlyFive';
        const encodedText: string = stringToBase64(text);
        expect(encodedText).toBe('RXhhY3RseUZpdmU=');
    });
});

describe('removeConsecutiveSlashes', () => {
    it('should remove all slashes when more then 2 in a row used', () => {
        const input = 'some//path///with////consecutive////slashes';
        const result = removeConsecutiveSlashes(input);
        expect(result).toBe('somepathwithconsecutiveslashes');
    });

    it('should handle empty string', () => {
        const input = '';
        const result = removeConsecutiveSlashes(input);
        expect(result).toBe('');
    });

    it('should handle a string without consecutive slashes', () => {
        const input = 'no_consecutive_slashes';
        const result = removeConsecutiveSlashes(input);
        expect(result).toBe('no_consecutive_slashes');
    });

    it('should handle a string with a single slash', () => {
        const input = 'single/slash';
        const result = removeConsecutiveSlashes(input);
        expect(result).toBe('single/slash');
    });

    it('should handle a string with a single backslash', () => {
        const input = 'single\\slash';
        const result = removeConsecutiveSlashes(input);
        expect(result).toBe('single\\slash');
    });
});
