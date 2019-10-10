import { IUrlBuilder } from "./IUrlBuilder";
import { IResponseAuth } from "./IResponseAuth";

export interface IServiceConfig{
    urlBuilder: IUrlBuilder,
    auth: IResponseAuth,
    url: string, 
}