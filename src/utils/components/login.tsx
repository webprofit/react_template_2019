import React from "react";
import { Container, Paper, Grid, Button, Typography } from "@material-ui/core";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";

import { Auth } from "COMMON/services/AuthService";
import { IState, IProps } from "COMMON/interfaces/main-interfaces";
import BaseComponent from "COMMON/base-classes/BaseComponent";

class ILoginProps extends IProps {
    login: () => void;
    history: any;
    location: any;
}

class LoginState extends IState {
    authUser: {
        email: string,
        password: string,
    }
}


export default class LoginComponent extends BaseComponent<ILoginProps, LoginState> {

    constructor(props: ILoginProps) {
        super(props);
    }

    getInitialState() {
        return {
            authUser: {
                email: '',
                password: ''
            }
        }
    }


    componentDidMount() {
        ValidatorForm.addValidationRule('isPasswordMatch', (value) => {
            if (value !== this.state.authUser.password) {
                return false;
            }
            return true;
        });
    }

    handleChange = (name: string) => (event: any) => {
        this.setState({
            authUser: {
                ...this.state.authUser,
                [name]: event.target.value
            }
        })
    }

    login = (e: any) => {
        e.preventDefault();
        this.showLoading(true);
        Auth.getProvider().signIn(e.target["email"].value as string, e.target["repeatPassword"].value as string)
            .then(
                user => {
                    this.props.history.push("/");
                },
                error => {
                    this.notifyError('Wrong login or password');
                }
            ).finally(() => { this.showLoading(false) });
    }


    render() {
        return (
            <div className="login-form">
                <Container maxWidth="sm">

                    <ValidatorForm
                        ref="form"
                        onSubmit={(e: any) => this.login(e)}
                    >
                        <Paper elevation={3} style={{ padding: 20 }}>
                            <Typography color="textSecondary" variant="h6" component="h4" align="center">
                                Login
                          </Typography>

                            <TextValidator
                                fullWidth={true}
                                label="Email"
                                name="email"
                                type="email"
                                margin="normal"
                                value={this.state.authUser.email || ""}
                                onChange={this.handleChange('Email')}
                                validators={['required', 'isEmail']}
                                errorMessages={['this field is required', 'email is not valid']}
                            />
                            <TextValidator
                                fullWidth={true}
                                id="standard-number"
                                type="password"
                                label="Password"
                                name="repeatPassword"
                                margin="normal"
                                value={this.state.authUser.password || ""}
                                onChange={this.handleChange('password')}
                                validators={['required', 'isPasswordMatch']}
                                errorMessages={['this field is required', 'password mismatch']}
                            />
                            <Grid
                                container
                                direction="row"
                                justify="flex-end"
                                alignContent="flex-end"
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    style={{ marginTop: 20 }}
                                >
                                    Login
                                 </Button>
                            </Grid>
                        </Paper>
                    </ValidatorForm>
                </Container>
            </div>
        );
    }
}