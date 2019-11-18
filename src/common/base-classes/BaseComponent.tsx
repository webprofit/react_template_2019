import * as React from 'react';
import Moment from 'moment';
import { IProps, IState } from 'COMMON/entities/basePropsState';
import { User } from 'COMMON/entities/User';
import { ErrorResponse, ErrorDetails } from 'COMMON/entities/ErrorHandling';
import INotification from 'COMMON/interfaces/INotification';
import ILoadIndicator from 'COMMON/interfaces/ILoadIndicator';
import { IAuth } from 'COMMON/interfaces/IAuth';
import IBaseConfig from 'COMMON/interfaces/IBaseConfig';


export default class BaseComponent<P extends IProps, S extends IState> extends React.Component<P, S> {
    protected moment = Moment;
    protected user: User;
    private notification: INotification;
    private loadIndicator: ILoadIndicator;
    private auth: IAuth;

    constructor(props: P, config: IBaseConfig) {
        super(props);
        this.notification = config.notification;
        this.loadIndicator = config.loadIndicator;
        this.auth = config.auth
        this.state = this.getInitialState();
    }

    getInitialState(): S {
        return {} as S;
    }

    componentWillMount() {
        this.moment.locale('en');
        if (this.auth) {
            this.auth.getIdentity()
                .then((res: User) => {
                    this.user = res;
                    this.authCompleted();
                });
        }
    }

    authCompleted() { }

    protected showLoading = (show: boolean): any => this.loadIndicator.notify(show);

    notifyError = (msg: string): void => this.notification.notify('error', msg, 15000);

    notifyWarning = (msg: string): void => this.notification.notify('warning', msg, 15000);

    notifyInfo = (msg: string): void => this.notification.notify('info', msg);

    notifySuccess = (msg: string): void => this.notification.notify('success', msg);

    handleError = (err: Error | ErrorResponse): void => {
        this.showLoading(false);
        if (err instanceof ErrorResponse) {

            if ((err as ErrorResponse).details) {
                if ((err as ErrorResponse).details.status == 401) {
                    this.notifyError(`Unauthorized. Please sign in.`);
                    return;
                }
                if ((err as ErrorResponse).details.status === 404) {
                    this.notifyError(`Data not found.`);
                    return;
                }
                if ((err as ErrorResponse).details.status === 403) {
                    this.notifyError(`Forbidden.`);
                    return;
                }
                (err as ErrorResponse).details.json()
                    .then((data: ErrorDetails | any) => {

                        if (this.onError(data)) {
                            return;
                        }

                        if (data.detail) {
                            this.notifyError(data.detail);
                        }
                        // else {
                        //     for (var property in data) {
                        //         if (property == '') {
                        //             this.notifyError('Bad request: invalid data has been submitted.');
                        //             continue;
                        //         }
                        //         if (data.hasOwnProperty(property)) {
                        //             this.notifyError(data[property].join(' '));
                        //         }
                        //     }
                        // }
                    })
                    .catch(err => {
                        this.notifyError(`Server error occured. Please contact system administrator.`);
                    });
            } else {
                this.notifyError(`Failed to process request. Please contact system administrator.`);
            }
        }
        else {
            this.notifyError(`Failed to process request. Please contact system administrator.`);
        }
    }

    getParseDateString = (date: Date): string => {
        return `DateTime.Parse("${new Date(date).toDateString()}")`
    }

    onError(e: ErrorDetails): boolean {
        return false;
    }

    ignoreEnter(event: any): void {
        if (event.which === 13 /* Enter */) {
            event.preventDefault();
        }
    }

    onCustomKeyDown = (event: any, property: string) => {
        if (event.key == "Backspace") {
            if (event.target.value.length == 1)
                event.target.value = "";
        }
        if (event.key == "." && property != 'weigh') {
            event.target.value = ">";
        }
    }
}