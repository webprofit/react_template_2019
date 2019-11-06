
import { Route, Redirect } from "react-router";
import React from "react";
import { Auth } from "COMMON/services/AuthService";
import NotificationService from "UTILS/services/NotificationService";
import { UserRole } from "COMMON/entities/User";

export const PrivateRoute = ({ component: Component, roles, ...rest }:any) => (
    <Route {...rest} render={props => {

        const currentUser = Auth.getProvider().Identity();//AuthenticationService.currentUserValue;
        if (!currentUser) {
            // not logged in so redirect to login page with the return url
            return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        }

        if(currentUser.role > UserRole.Admin && props.location.pathname == '/'){
            return <Redirect to={{ pathname: '/admin', state: { from: props.location } }} />
        }

        // check if route is restricted by role
        if (roles > currentUser.role) {
            // role not authorised so redirect to home page
            NotificationService.getInstance().notify('error', "Access Denied.");
            return <Redirect to={{ pathname: '/'}} />
        }

        // authorised so return component
        return <Component {...props} />
    }} />
)