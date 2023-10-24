export function hasKeyInMap(map: object, key: string): boolean {
    return Object.keys(map).includes(key);
}

export function deleteProperty(obj: object, property: string): void {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
        // @ts-ignore
        delete obj[property];
    }
}
