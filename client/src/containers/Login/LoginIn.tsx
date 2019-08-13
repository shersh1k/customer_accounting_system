import React from 'react';
import { Paper, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import loginClasses from "../../style/Login.module.scss";
import UIClasses from "../../style/UI.module.scss";
import { connect } from 'react-redux';
import { State } from '../../store';
import { submitLogin, submitLoginVK } from '../../store/user/actions';

interface iProps {
    error: boolean;
    errorMessage?: string;
    isPending?: boolean;
    onSubmitLogin: (email: string, password: string) => void
    onSubmitLoginVK: () => void;
}

interface iState {
    email?: string;
    password?: string;
}

class LoginIn extends React.Component<iProps, iState> {
    onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const { email, password } = this.state;
        if (email && password)
            this.props.onSubmitLogin(email, password)
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
    };

    render() {
        const { error, errorMessage, isPending } = this.props
        return (
            <Paper className={loginClasses.paper}>
                <form onSubmit={this.onSubmitLogin} className={loginClasses.form}>
                    <TextField
                        required
                        name="email"
                        type="email"
                        label="E-mail"
                        margin="dense"
                        onChange={this.handleInput}
                    />
                    <TextField
                        required
                        name="password"
                        type="password"
                        label="Password"
                        margin="dense"
                        onChange={this.handleInput}
                    />
                    <div className={UIClasses.fetcingWrapper}>
                        <Button type="submit" variant="contained" color="primary" disabled={isPending}>Войти</Button>
                        {isPending && <CircularProgress size={24} className={UIClasses.fetching} />}
                    </div>
                </form>
                <Snackbar open={error} message={<span style={{ color: "orangered" }}>{errorMessage}</span>} />
            </Paper>
        )
    }
}

const mapStateToProps = (store: State) => ({
    error: store.user.error || false,
    errorMessage: store.user.errorMessage,
    isPending: store.user.isPending
});

const mapDispatchToProps = {
    onSubmitLogin: submitLogin,
    onSubmitLoginVK: submitLoginVK
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginIn)