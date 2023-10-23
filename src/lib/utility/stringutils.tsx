export function truncate(str: string, length: number): string {
    return str.length > length ? str.substring(0, length - 1) + '...' : str;
}
