import * as React from 'react';
import Moment from 'moment';
import { IProps, IState } from 'COMMON/interfaces/main-interfaces';
import { User } from 'COMMON/entities/User';
import { Auth } from 'COMMON/services/AuthService';
import LoadIndicatorService from 'COMMON/services/LoadingService';
import NotificationService from 'COMMON/services/NotificationService';
import ErrorService, {ErrorResponse, ErrorDetails} from 'COMMON/services/ErrorHandling';

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
        NotificationService
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
        if (!this.onError(err as any)) {
            this.notifyError(ErrorService.getInstance().handleError(err));
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