import React, { useState } from 'react';
import { Paper, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { State } from '../../store';
import { submitLogin, submitLoginVK } from '../../store/user/actions';

export default function LoginIn() {
  const dispatch = useDispatch();
  const { error, errorMessage, isPending } = useSelector((state: State) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password) dispatch(submitLogin(email, password));
  };
  return (
    <Paper>
      <form onSubmit={onSubmitLogin}>
        <TextField required type='email' label='E-mail' onChange={(e) => setEmail(e.target.value)} />
        <TextField required type='password' label='Password' onChange={(e) => setPassword(e.target.value)} />
        <div>
          <Button type='submit' variant='contained' color='primary' disabled={isPending}>
            Войти
            </Button>
          {isPending && <CircularProgress size={24} />}
        </div>
      </form>
      <Snackbar open={error} message={<span style={{ color: 'orangered' }}>{errorMessage}</span>} />
    </Paper>
  );
}
