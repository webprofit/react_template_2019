import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { IProps, IState } from 'COMMON/interfaces/main-interfaces';
import AppWrapper from 'UTILS/auth/auth-Guard';
import LoginComponent from 'UTILS/components/login';
import AdminComponent from './admin.component';
import { PrivateRoute } from 'UTILS/auth/private-route';


export default class AppAdmin extends React.Component<IState, IProps> {

  render() {

    return (
      <AppWrapper>
        <Switch>
          <Route exact path='/login' component={LoginComponent} />
          <PrivateRoute authed={true} path='/' component={AdminComponent} />
        </Switch>
      </AppWrapper>
    );
  }
}
