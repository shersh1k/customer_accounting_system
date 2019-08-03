import React from "react";
import { connect } from 'react-redux';
import { State } from "../store";
// import { handleLogin } from "../store/user/actions";
import { emailChange, nameChange, passwordChange, submitRegister, submitLogin, submitLoginVK } from "../store/user/actions";
import { Tabs, Tab, TextField, Button, Paper, Container } from "@material-ui/core";
import SwipeableViews from "react-swipeable-views";
import loginClasses from "../style/Login.module.scss";

interface iProps {
    email?: string;
    password?: string;
    name?: string;
    onEmailChange: (value: string) => void;
    onNameChange: (value: string) => void;
    onPasswordChange: (value: string) => void;
    onSubmitRegister: (email: string, password: string, name: string) => void
    onSubmitLogin: (email: string, password: string) => void
    onSubmitLoginVK: () => void;
}

interface iState {
    tabValue: number
}

class Login extends React.Component<iProps, iState> {
    constructor(props: iProps) {
        super(props);
        this.state = {
            tabValue: 0
        }
    }

    onEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onEmailChange(e.target.value)
    }
    onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onNameChange(e.target.value)
    }
    onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onPasswordChange(e.target.value)
    }
    onSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, name } = this.props;
        if (email && password && name)
            this.props.onSubmitRegister(email, password, name)
    }
    onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, password } = this.props;
        if (email && password)
            this.props.onSubmitLogin(email, password)
    }

    handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({ tabValue: newValue });
    }

    handleChangeIndex = (newValue: number) => {
        this.setState({ tabValue: newValue });
    }
    render() {
        return (
            <Container maxWidth="sm" className={loginClasses.main}>
                shershnev942@gmail.com
                <Tabs
                    value={this.state.tabValue}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label="Войти" /* {...a11yProps(0)} */ />
                    <Tab label="Регистрация" /* {...a11yProps(1)} */ />
                </Tabs>
                <SwipeableViews onChangeIndex={this.handleChangeIndex} index={this.state.tabValue} className={loginClasses.body} >
                    <Paper>
                        <form onSubmit={this.onSubmitLogin} className={loginClasses.form}>
                            <TextField
                                required
                                type="email"
                                label="E-mail"
                                margin="dense"
                                onChange={this.onEmailChange}
                            />
                            <TextField
                                required
                                type="password"
                                label="Password"
                                margin="dense"
                                onChange={this.onPasswordChange}
                            />
                            <Button type="submit" variant="contained" color="primary">Войти</Button>
                        </form>
                    </Paper>
                    <Paper>
                        <form onSubmit={this.onSubmitRegister} className={loginClasses.form}>
                            <TextField
                                required
                                type="email"
                                label="E-mail"
                                margin="dense"
                                onChange={this.onEmailChange}
                            />
                            <TextField
                                required
                                type="text"
                                label="Name"
                                margin="dense"
                                onChange={this.onNameChange}
                            />
                            <TextField
                                required
                                type="password"
                                label="Password"
                                margin="dense"
                                onChange={this.onPasswordChange}
                            />
                            <Button type="submit" variant="contained" color="primary">Зарегистрироваться</Button>
                        </form>
                    </Paper>
                </SwipeableViews>
            </Container>
        )
    }
}

const mapStateToProps = (store: State) => ({
    user: store.user,
    email: store.user.email,
    password: store.user.password,
    name: store.user.username
});

const mapDispatchToProps = {
    onEmailChange: emailChange,
    onNameChange: nameChange,
    onPasswordChange: passwordChange,
    onSubmitRegister: submitRegister,
    onSubmitLogin: submitLogin,
    onSubmitLoginVK: submitLoginVK
};

export default connect(mapStateToProps, mapDispatchToProps)(Login)