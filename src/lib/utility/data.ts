export function hasKeyInMap(map: object, key: string): boolean {
    return Object.keys(map).includes(key);
}

export function getRandomLimitedItemsFromArray<T>(
    originalArray: T[] | undefined,
    limit: number,
): T[] {
    if (!originalArray) {
        return [];
    }

    let result = [...originalArray];
    result.sort(() => Math.random() - Math.random());
    result = result.slice(0, limit);

    return result;
}
