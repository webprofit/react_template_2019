import * as React from 'react';
import Moment from 'moment';
import { IProps, IState } from '../../common/interfaces/main-interfaces';
import { User } from '../../common/entities/User';
import { Auth } from '../services/AuthService';
import LoadIndicatorService from '../services/LoadingService';
import NotificationService from '../services/NotificationService';
import ErrorResponse, { ErrorDetails } from '../services/ErrorHandling';

export default class BaseComponent<P extends IProps, S extends IState> extends React.Component<P, S> {
    protected moment = Moment;
    protected user: User = null;

    constructor(props: P) {
        super(props);
        this.state = this.getInitialState();
    }

    getInitialState(): S {
        return {} as S;
    }

    componentWillMount() {
        this.moment.locale('en');
        Auth.getProvider().getIdentity()
            .then((res: User) => {
                this.user = res;
                this.authCompleted();
            });
    }

    authCompleted() {    }

    protected showLoading = (show: boolean): any => LoadIndicatorService.getInstance().notify(show);

    notifyError = (msg: string): void => {
        NotificationService.getInstance().notify('error', msg, 15000);
    }

    notifyWarning = (msg: string): void => {
        NotificationService.getInstance().notify('warning', msg, 15000);
    }

    notifyInfo = (msg: string): void => {
        NotificationService.getInstance().notify('info', msg);
    }

    notifySuccess = (msg: string): void => {
        NotificationService.getInstance().notify('success', msg);
    }

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

                        if(data.detail){
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
        } else {
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