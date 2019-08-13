import React from 'react';
import { Paper, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import loginClasses from "../../style/Login.module.scss";
import { connect } from 'react-redux';
import { State } from '../../store';
import { submitLoginVK, submitRegister } from '../../store/user/actions';

interface iProps {
    error: boolean;
    errorMessage?: string;
    isPending?: boolean;
    onSubmitRegister: (email: string, password: string, name: string) => void
    onSubmitLoginVK: () => void;
}

interface iState {
    email?: string;
    password?: string;
    username?: string;
}

class Register extends React.Component<iProps, iState> {
    onSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { email, password, username } = this.state;
        if (email && password && username)
            this.props.onSubmitRegister(email, password, username)
    }

    handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.currentTarget;
        this.setState({ [name]: value });
    };

    render() {
        const { error, errorMessage, isPending } = this.props
        return (
            <Paper className={loginClasses.paper}>
                <form onSubmit={this.onSubmitRegister} className={loginClasses.form}>
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
                        name="username"
                        type="text"
                        label="Name"
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
                    <div className={loginClasses.fetcingWrapper}>
                        <Button type="submit" variant="contained" color="primary" disabled={isPending}>Зарегистрироваться</Button>
                        {isPending && <CircularProgress size={24} className={loginClasses.fetching} />}
                    </div>
                </form>
                <Snackbar style={{ color: "red" }} open={error} message={<span style={{ color: "orangered" }}>{errorMessage}</span>} />
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
    onSubmitRegister: submitRegister,
    onSubmitLoginVK: submitLoginVK
};

export default connect(mapStateToProps, mapDispatchToProps)(Register)