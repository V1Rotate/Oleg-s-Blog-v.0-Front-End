import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth, selectIsAuth } from '../../redux/slices/auth.js';
import { Navigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useForm } from 'react-hook-form';

import styles from './Login.module.scss';

export const Login = () => {
  const isAuth = useSelector(selectIsAuth); //this variable lets know if I am authorized or not. Check console and find if isAuth is true or not.
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,

    formState: { errors, isValid },
  } = useForm({
    //React useForm stores email and passwork we get when user is logging in - we can check in the console.
    defaultValues: {
      email: 'oleg@olegsblog.com', //default data
      password: '123456',
    },
    mode: 'onChange',
  });

  // onSubmit func will run only if react hook form understand that validation passed normally.
  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values)); //expecting to get values (object with the email and password) from backend

    if (!data.payload) {
      //if there is no data in payload , there will be an error.
      return alert('Authorization failed');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token); //if there is a token inside payloea - that means that the user is authorized and we ask window.localStorage to save token.
    }
  };

  //IMPORTANT! if user is uuthorized, it will navigate him to the main page.
  if (isAuth) {
    return <Navigate to='/' />;
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant='h5'>
        Sign In
      </Typography>
      {/*onsubmit runs only if two textfields below passsed validation*/}
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label='E-Mail'
          error={Boolean(errors.email?.message)} //if get error here, so error will be true, it will have red color backlight.
          helperText={errors.email?.message}
          //these two form needed to be resigstered;
          type='email' //simple validation by the browser - it will catch if there is no @ symbol
          {...register('email', { required: 'Input your email' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label='Password'
          error={Boolean(errors.password?.message)} //if error true, it will have red color backlight.
          helperText={errors.password?.message}
          {...register('password', { required: 'Input your password' })}
          fullWidth
          //If these 2 textfields rendering normally, they will be registered in useForm.
        />
        <Button type='submit' size='large' variant='contained' fullWidth>
          Sign In
        </Button>
      </form>
    </Paper>
  );
};
