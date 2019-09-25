import ResourceDataService, { IResourceServiceConfig } from '../data-service/ResourceDataService';
import { BaseEntity } from '../entities/BaseEntity';
import { ConfigHelper } from '../helpers/ConfigHelper';

export interface IDataServiceConfig extends IResourceServiceConfig {

}

export default class DataService<T extends BaseEntity> extends ResourceDataService<T> {

    constructor(config: IDataServiceConfig | string) {
        super(typeof (config) === 'string' ? ConfigHelper.getDefaultConfig(config) : ConfigHelper.ensureConfig(config));
    }

    async create(obj: T): Promise<T> {
        const res = await super.requestJSON(this.url, 'POST', obj);
        this.cache.clear(this.url);
        return res;
    }

    async update(obj: T, uniqueId: number = null, putIdInUrl = true): Promise<T> {
        const res = await super.requestJSON(this.url + this.config.urlBuilder.getUpdateParams({ objId: obj.id, rowVersion: obj.rowVersion, uniqueId: uniqueId }, putIdInUrl), 'PUT', obj);
        this.cache.clear(this.url);
        return res;
    }

    async delete(id: number, putIdInUrl = true): Promise<null> {
        await super.requestJSON(`${this.url}/${putIdInUrl ? id : ''}`, 'DELETE', putIdInUrl ? '' : { id: id });
        this.cache.clear(this.url);
        return;
    }

    async deleteItem(item: any): Promise<null> {
        await super.requestJSON(`${this.url}`, 'DELETE', { id: item.id, rowVersion: item.rowVersion });
        this.cache.clear(this.url);
        return;
    }
    async deleteArr(arrIds: { id: number }[]): Promise<null> {
        await super.requestJSON(this.url, 'DELETE', arrIds);
        this.cache.clear(this.url);
        return;
    }
}