import { IResponseAuth } from "../interfaces/IResponseAuth";
import { IUrlBuilder } from "../interfaces/IUrlBuilder";
import { IDataServiceConfig } from "../data-service/DataService";
import { BaseEntity } from "../entities/BaseEntity";

export interface IListConfig extends IDataServiceConfig {
    url: string;
    includes: string[];
    auth: IResponseAuth;// = Auth.getProvider();
    urlBuilder: IUrlBuilder;// = new UrlHelper();
}

export interface IEditableListConfig<T extends BaseEntity> extends IListConfig {
    type: { new(): T ;} 
}