import { hasKeyInMap } from '../../../../src/lib/utility/data';

test('it can determine if a key exists in an object map', () => {
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

test('it can determine if a key does not exists in an object map', () => {
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
