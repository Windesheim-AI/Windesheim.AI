import { Buffer } from 'buffer';

export function truncate(str: string, length: number): string {
    return str.length > length ? str.substring(0, length - 1) + '...' : str;
}

export const stringToBase64 = (input: string): string => {
    const buffer = Buffer.from(input, 'utf-8');
    return buffer.toString('base64');
};

export function removeConsecutiveSlashes(input: string) {
    return input.replace(/\/{2,}|\\{2,}/g, '');
}
