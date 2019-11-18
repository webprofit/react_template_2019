import React from 'react';
import '../../app.css';
import { IProps } from 'COMMON/entities/basePropsState';
import { HashRouter as Router, Link } from 'react-router-dom';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { User } from 'COMMON/entities/User';
import { Auth } from 'UTILS/services/AuthService';
import LoadIndicatorService from 'UTILS/services/LoadingService';
import { LoadIndicator } from '../components/load-indicator/load-Indicator';
import ErrorMessage from '../components/error-message/error-message';
import { createBrowserHistory } from 'history';
import { ErrorResponse } from 'COMMON/entities/ErrorHandling';

export const history = createBrowserHistory();

interface IAppState {
    user: User,
    identityInitialized: boolean,
    loading: boolean,
}

class IAppProps extends IProps {
    authentication: boolean;
}


const theme = createMuiTheme({
    typography: {
        "fontFamily": "\"Open Sans\", \"Helvetica\", \"Arial\", sans-serif",
    },
    palette: {
        type: 'light',
        // type: 'dark',
        primary: {
            main: '#0f6eaf',
            dark: '#429bd8', // on hover
            // contrastText: '#fff',
        },
        secondary: {
            light: '#25b97d',
            main: '#25b97d',
            dark: '#25b97d',
            contrastText: '#000',
        },
    },
});


export default class AppWrapper extends React.Component<IAppProps, IAppState> {

    loadingService = LoadIndicatorService.getInstance();
    private provider = Auth.getProvider();

    constructor(props: IAppProps) {
        super(props)

        this.state = {
            user: null,
            identityInitialized: false,
            loading: false,
        } as IAppState;

        this.loadingService.subscribe((visible: boolean) => this.setState({ loading: visible }));
        if (props.authentication) {

            this.provider.onInitialized((x: User) => {
                this.setState({ user: x, identityInitialized: true, loading: false });
            });
        }
    }

    componentDidMount() {
        this.setState({ loading: true });
        if (this.props.authentication) {
        this.provider.onUnauthorized(this.handleUnauthorized);
            this.provider.getIdentity()
            .then((x: User) => {
                this.setState({ user: x, identityInitialized: true, loading: false });
            });
        } else {
            this.setState({identityInitialized: true, loading: false})
        }
    }

    logout = () => {
        this.setState({ loading: true });
        this.provider.signOut()
            .then((x: User) => {
                this.setState({ user: null, identityInitialized: true, loading: false });
                // location.replace('/');
            })
            .catch((err: Error | ErrorResponse) => {
                location.replace('/');
            });
        //history.push('/login');
    }

    handleUnauthorized = () => {
        location.replace('/');
    }
  

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Router>
                    <div className="app">
                        <ErrorMessage />
                        {LoadIndicator(this.state.loading)}
                        {this.state.identityInitialized ? this.props.children : ''}
                    </div>
                </Router>
            </ThemeProvider >

        );
    }
}
