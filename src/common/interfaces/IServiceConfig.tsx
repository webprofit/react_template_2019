import { IUrlBuilder } from "./IUrlBuilder";
import { IResponseAuth } from "./IResponseAuth";
import IBaseConfig from "./IBaseConfig";

export interface IServiceConfig extends IBaseConfig{
    urlBuilder: IUrlBuilder,
    auth: IResponseAuth,
    url: string, 
}