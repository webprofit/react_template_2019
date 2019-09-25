import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import LoginComponent from '../../utils/components/login';
import AdminComponent from '../admin/admin.component';
import MainComponent from './main-component';

import { PrivateRoute } from '../../utils/auth/private-route';
import { UserRole } from '../../common/entities/User';
import AppWrapper from '../../utils/auth/auth-Guard';
import { IState, IProps } from '../../common/interfaces/main-interfaces';

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
