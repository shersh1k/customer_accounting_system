import React, { useState } from 'react';
import { Paper, TextField, Button, CircularProgress, Snackbar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { State } from '../../store';
import { submitRegister } from '../../store/user/actions';

export default function Register() {
  const dispatch = useDispatch();
  const { error, errorMessage, isPending } = useSelector((state: State) => state.user);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const onSubmitRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email && password && username) dispatch(submitRegister(email, password, username));
  };

  return (
    <Paper>
      <form onSubmit={onSubmitRegister}>
        <TextField required type='email' label='E-mail' onChange={e => setEmail(e.target.value)} />
        <TextField required type='text' label='Name' onChange={e => setUsername(e.target.value)} />
        <TextField required type='password' label='Password' onChange={e => setPassword(e.target.value)} />
        <div>
          <Button type='submit' variant='contained' color='primary' disabled={isPending}>
            Зарегистрироваться
            </Button>
          {isPending && <CircularProgress size={24} />}
        </div>
      </form>
      <Snackbar
        style={{ color: 'red' }}
        open={error}
        message={<span style={{ color: 'orangered' }}>{errorMessage}</span>}
      />
    </Paper>
  );
}

