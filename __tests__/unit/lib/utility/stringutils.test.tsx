import { truncate } from '../../../../src/lib/utility/stringutils';

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
