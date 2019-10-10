import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginComponent from 'UTILS/components/login';
import AdminComponent from '../admin/admin.component';
import MainComponent from './main-component';

import { PrivateRoute } from 'UTILS/auth/private-route';
import { UserRole } from 'COMMON/entities/User';
import AppWrapper from 'UTILS/auth/auth-Guard';
import { IState, IProps } from 'COMMON/interfaces/main-interfaces';

interface IAppState extends IState {
}

interface IAppProps extends IProps {
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props: IAppProps) {
    super(props);
   
    this.state = {
    } as IAppState
  }

  render() {
    return (
      <AppWrapper>
        <Switch>
          {/* <Route exact path='/' render={() => (<Redirect to="/enrollments" />)} /> */}
          <Route path="/login" component={LoginComponent} />
          <PrivateRoute path="/admin" roles={UserRole.Admin} component={AdminComponent} />
          <PrivateRoute exact path="/" component={MainComponent} />
        </Switch>
      </AppWrapper>
    );
  }
}
