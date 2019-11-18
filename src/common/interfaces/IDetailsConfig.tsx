import { IResponseAuth } from "./IResponseAuth";
import { IUrlBuilder } from "./IUrlBuilder";
import { IDataServiceConfig } from "COMMON/data-service/DataService";
import { IEntity } from "./IEntity";


export interface IDetailsConfig<T extends IEntity> extends IDataServiceConfig {
    url: string;
    id: number;
    urlSufix?: string;
    includes: string[];
    urlBuilder: IUrlBuilder;
    type: { new(): T ;} 
}