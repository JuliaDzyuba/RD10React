import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/slices/user.slice';
import styles from './styles.module.scss';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  return (
    <header className={styles.header}>
      <h1>Movies</h1>
      {user && (
        <>
          <p>{user.username}</p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </>
      )}
    </header>
  );
}

export default Header;
