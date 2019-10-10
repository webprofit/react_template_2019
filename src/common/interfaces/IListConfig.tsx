import { IResponseAuth } from "./IResponseAuth";
import { IUrlBuilder } from "./IUrlBuilder";
import { IDataServiceConfig } from "COMMON/data-service/DataService";
import { BaseEntity } from "COMMON/entities/BaseEntity";

export interface IListConfig extends IDataServiceConfig {
    url: string;
    includes: string[];
    auth: IResponseAuth;// = Auth.getProvider();
    urlBuilder: IUrlBuilder;// = new UrlHelper();
}

export interface IEditableListConfig<T extends BaseEntity> extends IListConfig {
    type: { new(): T ;} 
}