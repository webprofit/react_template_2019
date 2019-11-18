import INotification from "./INotification";
import { IResponseAuth } from "./IResponseAuth";
import { IAuth } from "./IAuth";
import ILoadIndicator from "./ILoadIndicator";

export default interface IBaseConfig {
    notification: INotification;
    loadIndicator: ILoadIndicator;
    auth: IAuth,
}