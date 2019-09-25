export class MemoryCache {

    private static data: any = {};
    private static instance: MemoryCache;

    static getInstance() {
        if (!MemoryCache.instance) {
            MemoryCache.instance = new MemoryCache();
        }
        return MemoryCache.instance;
    }

    cache(key: string, value: any, expiration: number = 10, dependencies: string[] = []): void {
        if (expiration > 0) {
            MemoryCache.data[key] = { data: value, dependencies };
            setTimeout(() => { MemoryCache.data[key] = null; }, expiration * 60 * 1000);
        }
    }


    get(key: string): any {
        return MemoryCache.data[key].data;
    }

    keyExist(key: string): boolean {
        return MemoryCache.data[key] ? true : false;
    }

    clear(key: string): void {
        Object.getOwnPropertyNames(MemoryCache.data).map((prop: string, i: number) => {
            if (prop.includes(key)) {
                MemoryCache.data[prop] = null;
            }
        })
    }

    clearAllCache() {
        MemoryCache.data = [];
    }

    invalidate(key: string): void {
        Object.getOwnPropertyNames(MemoryCache.data).forEach(prop => {
            if (prop.search(`${key}_`) !== -1) {
                MemoryCache.data[prop] = null;
            }
            else {
                if (MemoryCache.data[prop]) {
                    MemoryCache.data[prop].dependencies.forEach((element: any) => {
                        if (key.search(`${element}`) !== -1) {
                            MemoryCache.data[prop] = null;
                        }
                    });
                }
            }
        });
    }
}
