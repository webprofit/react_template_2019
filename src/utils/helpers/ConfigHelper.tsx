import { IDetailsConfig } from "COMMON/interfaces/IDetailsConfig";
import { IServiceConfig } from "COMMON/interfaces/IServiceConfig";
import { IEntity } from "COMMON/interfaces/IEntity";
import { Auth } from "UTILS/services/AuthService";
import UrlHelper from "./UrlHelper";
import NotificationService from "UTILS/services/NotificationService";
import { KeyHelper } from "./KeyHelper";
import { IMemoryCache } from "COMMON/interfaces/IMemoryCache";
import { MemoryCache } from "UTILS/services/MemoryCache";
import LoadIndicatorService from "UTILS/services/LoadingService";

export class ConfigHelper {
    static getDefaultConfig(url: string, internalApi: boolean = false, includes: string[] = [], notification: any = null): IServiceConfig {
        return {
            url,
            includes,
            internalAPI: internalApi,
            auth: Auth.getProvider(),
            urlBuilder: new UrlHelper(),
            keyHelper: new KeyHelper(),
            cache: MemoryCache.getInstance(),
            loadIndicator: LoadIndicatorService.getInstance(),
            notification: notification ? notification : NotificationService.getInstance(),
        } as IServiceConfig;
    }

    static ensureConfig(config: IServiceConfig): IServiceConfig {
        if (!config.auth) {
            config.auth = Auth.getProvider();
        }
        if (!config.urlBuilder) {
            config.urlBuilder = new UrlHelper();
        }
        return config;
    }

    // static getDetailsDefaultConfig<T extends IEntity>(url: string, id: number, type: { new(): T; }, includes: string[] = null, notification: any = null): IDetailsConfig<T> {
    //     return {
    //         url,
    //         id,
    //         includes,
    //         auth: Auth.getProvider(),
    //         urlBuilder: new UrlHelper(),
    //         notification: notification ? notification : NotificationService.getInstance(),
    //         type: type,
    //     };
    // }
}