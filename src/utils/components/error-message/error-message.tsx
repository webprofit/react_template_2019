import * as React from 'react';
import '../error-message/error-messsage.css';
import { IconButton, makeStyles, Theme, SnackbarContent } from '@material-ui/core';
import { green, amber } from '@material-ui/core/colors';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import NotificationService from 'COMMON/services/NotificationService';

class IEState {
    messages: any;
    variant: string;
}
class IEProps {
}

const useStyles1 = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    }
}));

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

export interface Props {
    className?: string;
    message?: string;
    onClose?: () => void;
    variant: keyof typeof variantIcon;
}


function MySnackbarContentWrapper(props: Props) {
    const classes = useStyles1(props);
    const { className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={clsx(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={clsx(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }

            action={[
                <IconButton key="close" aria-label="close" color="inherit" onClick={onClose}>
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}

export default class ErrorMessage extends React.Component<IEProps, IEState> {
    constructor(props: IEProps) {
        super(props);

        this.state = {
            messages: [],
            variant: 'info'
        } as IEState;
    }

    componentDidMount() {
        NotificationService.getInstance().subscribe((variant: string, message: string, timeSec: number) => {
            this.showMessage(message, timeSec, variant);
        });
    }

    removeMessage = (index: number) => {
        this.setState((prevState: IEState) => {
            prevState.messages.splice(index);
            return { messages: prevState.messages }
        })
    }

    showMessage(mess: string = null, time: number = 8000, variant: string = 'info') {
        const _messages = this.state.messages;
        const index = _messages.length;
        const message = mess ? mess : 'Something went wrong';
        _messages.push({ message, variant })

        this.setState({ messages: _messages }, () => {
            setTimeout(() => {
                this.removeMessage(index);
                this.setState({ messages: _messages })
            }, time)
        })
    }

    render() {


        return (
            this.state.messages.length > 0 ?
                <div className="indicator-section">
                    {this.state.messages.map((msg: any, i: number) =>
                        <div key={i} className="indicator">
                            <MySnackbarContentWrapper
                                variant={msg.variant as Props["variant"]}
                                className="notification-bar"
                                message={msg.message}
                                onClose={() => this.removeMessage(i)}
                            />
                        </div>
                    )}
                </div>

                : null
        )
    }
}