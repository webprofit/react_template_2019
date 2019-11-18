// import { IAuth } from "COMMON/interfaces/IAuth";
// import INotification from "COMMON/interfaces/INotification";
// import { IUrlBuilder } from "COMMON/interfaces/IUrlBuilder";
// import UrlHelper from "./UrlHelper";
// import { Auth } from "UTILS/services/AuthService";
// import NotificationService from "UTILS/services/NotificationService";
// import { IListConfig, IEditableListConfig } from "COMMON/interfaces/IListConfig";
// import { IResponseAuth } from "COMMON/interfaces/IResponseAuth";


// export enum TypeBaseConfig {
//     'List',
//     'EditableList',
//     'Details'
// }

// export class BaseListConfig {
//     url: string;
//     auth: IResponseAuth;
//     notification: INotification;
//     urlBuilder: IUrlBuilder;
//     includes: string[];
// }

// export class BaseEditableListConfig<T> extends BaseListConfig {
//     type: { new(): T; }
// }



// export const getListConfig = (config: BaseListConfig = new BaseListConfig()): IListConfig => {
//     return {
//         // url: config.url ? config.url : '',
//         // includes: config.includes ? config.includes : [],
//         // auth: config.auth ? config.auth : Auth.getProvider(),
//         // urlBuilder: config.urlBuilder ? config.urlBuilder : new UrlHelper(),
//         // notification: config.notification ? config.notification : NotificationService.getInstance(),
//     }
// }

// // export  getEditableListConfig<T extends IEntity> = (config: BaseEditableListConfig<T> = new BaseEditableListConfig<T>(), t: any): IEditableListConfig<T> => {
    
// //     return {
// //         url: config.url ? config.url : '',
// //         includes: config.includes ? config.includes : [],
// //         auth: config.auth ? config.auth : Auth.getProvider(),
// //         urlBuilder: config.urlBuilder ? config.urlBuilder : new UrlHelper(),
// //         notification: config.notification ? config.notification : NotificationService.getInstance(),
// //         type: config.type: config.type : new(): T,
       
// //     } 
  
// // }

