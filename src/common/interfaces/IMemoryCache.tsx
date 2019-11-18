
export interface IMemoryCache {
    cache(key: string, value: any, expiration: number, dependencies: string[]): void;
    get(key: string): any;
    keyExist(key: string): boolean;
    clear(key: string): void;
    clearAllCache(): void;
    invalidate(key: string): void;
}