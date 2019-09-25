import React from 'react';
import { IProps, IState } from 'src/common/interfaces/main-interfaces';
import { Switch, Route } from 'react-router-dom';

import AppWrapper from '../../utils/auth/auth-Guard';
import LoginComponent from '../../utils/components/login';
import AdminComponent from './admin.component';
import { PrivateRoute } from '../../utils/auth/private-route';


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
