import {
    getRandomLimitedItemsFromArray,
    hasKeyInMap,
} from '../../../../src/lib/utility/data';

describe('hasKeyInMap', () => {
    it('can determine if a key exists in an object map', () => {
        // Arrange
        const map = {
            exist: 1,
            exist2: 1,
        };
        const searchKey = 'exist';

        // Act
        const result = hasKeyInMap(map, searchKey);

        // Assert
        expect(result).toBe(true);
    });

    it('can determine if a key does not exists in an object map', () => {
        // Arrange
        const map = {
            exist: 1,
            exist2: 1,
        };
        const searchKey = 'existfdasfdas';

        // Act
        const result = hasKeyInMap(map, searchKey);

        // Assert
        expect(result).toBe(false);
    });
});

describe('getRandomLimitedItemsFromArray', () => {
    it('returns an empty array when the original array is undefined', () => {
        const result = getRandomLimitedItemsFromArray(undefined, 5);
        expect(result).toEqual([]);
    });

    it('returns an empty array when the original array is empty', () => {
        const result = getRandomLimitedItemsFromArray([], 5);
        expect(result).toEqual([]);
    });

    it('returns the original array when the limit is greater than or equal to the array length', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const result = getRandomLimitedItemsFromArray(originalArray, 5);
        expect(result.length).toEqual(originalArray.length);
    });

    it('returns a subset of the original array with the specified limit', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const result = getRandomLimitedItemsFromArray(originalArray, 2);
        expect(result.length).toBe(2);
        expect(result.every((item) => originalArray.includes(item))).toBe(true);
    });

    it('does not modify the original array', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const result = getRandomLimitedItemsFromArray(originalArray, 3);
        expect(result).not.toBe(originalArray);
        expect(result.every((item) => originalArray.includes(item))).toBe(true);
    });

    it('returns a shuffled array when the limit is less than the array length', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const result = getRandomLimitedItemsFromArray(originalArray, 3);
        expect(result).not.toEqual(originalArray); // Check that it's shuffled
        expect(result.length).toBe(3);
        expect(result.every((item) => originalArray.includes(item))).toBe(true);
    });

    it('returns a subset of the original array when the limit is less than the array length', () => {
        const originalArray = [1, 2, 3, 4, 5];
        const result = getRandomLimitedItemsFromArray(originalArray, 3);
        expect(result.length).toBe(3);
        expect(result.every((item) => originalArray.includes(item))).toBe(true);
    });
});
