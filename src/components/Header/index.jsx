import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsAuth, logout } from '../../redux/slices/auth';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      dispatch(logout());
      window.localStorage.removeItem('token'); //when user is logged out, token will be removed from the localStorage.
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth='lg'>
        <div className={styles.inner}>
          <Link className={styles.logo} to='/'>
            <div>OLEG'S BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to='/add-post'>
                  <Button variant='contained'>Add post</Button>
                </Link>
                <Button
                  onClick={onClickLogout} //logout button;
                  variant='contained'
                  color='error'
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <Button variant='outlined'>Log in</Button>
                </Link>
                <Link to='/register'>
                  <Button variant='contained'>Sign up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
