export function containsAny(str: string, substrings: string[]): boolean {
    return substrings.some(substring => str.includes(substring));
}