import { deleteProperty, hasKeyInMap } from '../../../../src/lib/utility/data';

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

describe('deleteProperty', () => {
    it('should delete the property if it exists', () => {
        const obj = { foo: 'bar' };
        deleteProperty(obj, 'foo');
        expect(obj.foo).toBeUndefined();
    });

    it('should not throw an error when trying to delete a non-existing property', () => {
        const obj = { foo: 'bar' };
        expect(() => deleteProperty(obj, 'nonExistent')).not.toThrow();
    });

    it('should not delete other properties', () => {
        const obj = { foo: 'bar', baz: 'qux' };
        deleteProperty(obj, 'foo');
        expect(obj.baz).toBe('qux');
    });

    it('should work with nested properties', () => {
        const obj = { nested: { prop: 'value' } };
        deleteProperty(obj.nested, 'prop');
        expect(obj.nested.prop).toBeUndefined();
    });
});
