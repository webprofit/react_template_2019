import { IResponseAuth } from "../interfaces/IResponseAuth";
import { IUrlBuilder } from "../interfaces/IUrlBuilder";
import { IDataServiceConfig } from "../data-service/DataService";
import { IEntity } from "../interfaces/IEntity";

export interface IDetailsConfig<T extends IEntity> extends IDataServiceConfig {
    url: string;
    id: number;
    urlSufix?: string;
    includes: string[];
    auth: IResponseAuth;// = Auth.getProvider();
    urlBuilder: IUrlBuilder;// = new UrlHelper();
    type: { new(): T ;} 
}