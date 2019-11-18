import React from 'react';
import './app.css';
import ReactDOM from 'react-dom';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import AppWrapper from 'UTILS/auth/auth-Guard';
import { Switch, Route, Redirect } from 'react-router-dom';
import { PrivateRoute } from 'UTILS/auth/private-route';
import LoginComponent from 'UTILS/components/login';
import { UserRole } from 'COMMON/entities/User';
import AdminComponent from './pages/admin/admin.component';
import MainComponent from './pages/user/main-component';



const UserRoute = () => {
  return (
    <AppWrapper authentication={false}>
      <Switch>
        <Route path="/login" component={LoginComponent} />
        <Route path="/" component={MainComponent} />

        {/* <PrivateRoute path="/admin" roles={UserRole.Admin} component={AdminComponent} />
        <PrivateRoute exact path="/" component={MainComponent} /> */}

        <Redirect to="/" />
      </Switch>
    </AppWrapper>
  )
}

const App = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <UserRoute />
    </MuiPickersUtilsProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));