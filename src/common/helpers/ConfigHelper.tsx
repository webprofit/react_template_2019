import { IDetailsConfig } from "COMMON/interfaces/IDetailsConfig";
import { IServiceConfig } from "COMMON/interfaces/IServiceConfig";
import { IEntity } from "COMMON/interfaces/IEntity";
import { Auth } from "COMMON/services/AuthService";
import UrlHelper from "./UrlHelper";

export class ConfigHelper {
    static getDefaultConfig(url: string, internalApi: boolean = false, includes: string[] = []): IServiceConfig {
        return {
            url,
            includes,
            internalAPI: internalApi,
            auth: Auth.getProvider(),
            urlBuilder: new UrlHelper(),
        } as IServiceConfig;
    }

    static ensureConfig(config: IServiceConfig): IServiceConfig{
        if(!config.auth){
            config.auth = Auth.getProvider();
        }
        if(!config.urlBuilder){
            config.urlBuilder = new UrlHelper();
        }
        return config;
    }

    static getDetailsDefaultConfig<T extends IEntity>(url: string, id: number, type: { new(): T ;}, includes: string[] = null): IDetailsConfig<T>{
        return {
            url,
            id,
            includes,
            auth: Auth.getProvider(),
            urlBuilder: new UrlHelper(),
            type: type,
        };
    }
}