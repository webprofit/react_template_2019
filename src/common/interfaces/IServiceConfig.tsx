import { IUrlBuilder } from "../interfaces/IUrlBuilder";
import { IResponseAuth } from "../interfaces/IResponseAuth";

export interface IServiceConfig{
    urlBuilder: IUrlBuilder,
    auth: IResponseAuth,
    url: string, 
}