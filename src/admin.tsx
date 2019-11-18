
import React from 'react';
import './app.css';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import AppWrapper from 'UTILS/auth/auth-Guard';
import { Switch, Route } from 'react-router-dom';
import { PrivateRoute } from 'UTILS/auth/private-route';
import AdminComponent from './pages/admin/admin.component';
import LoginComponent from 'UTILS/components/login';

const AdminRoute = () => {
    return (
        <AppWrapper authentication={ true }>
            <Switch>
                <Route exact path='/login' component={LoginComponent} />
                <PrivateRoute authed={true} path='/' component={AdminComponent} />
            </Switch>
        </AppWrapper>
    )
}

const App = () => {
    return (
        <MuiPickersUtilsProvider utils={MomentUtils}>
            <AdminRoute />
        </MuiPickersUtilsProvider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));