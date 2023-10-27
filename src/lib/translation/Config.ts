export function getTranslateApiUrl(
    to: string,
    from: string,
    apiKey: string,
    value: string,
): string {
    return `https://translation.googleapis.com/language/translate/v2?source=${from}&target=${to}&key=${apiKey}&q=${value}&format=text`;
}
