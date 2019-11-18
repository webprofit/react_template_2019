import { IUrlBuilder } from "./IUrlBuilder";
import { IResponseAuth } from "./IResponseAuth";
import IBaseConfig from "./IBaseConfig";
import { IKeyHelper } from "./IKeyHelper";
import { IMemoryCache } from "./IMemoryCache";

export interface IServiceConfig extends IBaseConfig{
    cache: IMemoryCache,
    urlBuilder: IUrlBuilder,
    keyHelper: IKeyHelper,
    url: string, 
}