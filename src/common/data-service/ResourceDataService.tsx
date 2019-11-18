import BaseDataService from 'COMMON/data-service/BaseDataService';
import { IServiceConfig } from 'COMMON/interfaces/IServiceConfig';
import { BaseEntity } from 'COMMON/entities/BaseEntity';
import { IQueryParams, ISelectParams } from 'COMMON/interfaces/IUrlBuilder';
import { IMemoryCache } from 'COMMON/interfaces/IMemoryCache';
import { IKeyHelper } from 'COMMON/interfaces/IKeyHelper';


export interface IResourceServiceConfig extends IServiceConfig {

}

export interface IQueryResult<T extends BaseEntity> {
    data: T[];
    total: number;
}

export default class ResourceDataService<T extends BaseEntity> extends BaseDataService {

    protected cache: IMemoryCache ;
  
    protected dependencies: string[] = [];
    protected cacheMinutes: number = 10;
    protected generator: IKeyHelper;

    constructor(config: IResourceServiceConfig) {
        super(config);
        this.generator = config.keyHelper;
        this.cache = config.cache;
    }

    query(params: IQueryParams, noCache: boolean = false): Promise<T[]> {

            let key = !params.skip && !params.take &&  !this.generator ? this.generator.genKey([`${this.url}${params.oDataQuery}`, params.filter, params.order]) : '';
            if (key && !noCache) {
                const key = this.generator.genKey([`${this.url}${params.oDataQuery}`, params.filter, params.order]);
                
                if (this.cache.keyExist(key)) {
                    return Promise.resolve(this.cache.get(key))
                };
                if (this.cache.keyExist(`${key}_promise`)) {
                    return this.cache.get(`${key}_promise`)
                };
            }

        const promise = super.requestJSON(this.url + this.config.urlBuilder.getQueryParams(params))
            .then(res => {
                const _res = res.data ? res.data : res
                // const _res = res;
                if (key) {
                    this.cache.cache(key, _res, this.cacheMinutes, this.dependencies);
                }
                return _res;
            });

        if (key) {
            this.cache.cache(`${key}_promise`, promise, this.cacheMinutes, this.dependencies);
        }

        return promise;
    }

    select(params: ISelectParams): Promise<T> {
        return super.requestJSON(this.url + this.config.urlBuilder.getSelectParams(params))
            .then(res => {
                // return res.data ? res.data : res;
                return res;
            })
    }

    clearChache(){
        this.cache.clear(this.url);
    }
}