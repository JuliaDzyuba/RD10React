import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { logout, changeLang } from '../../store/slices/user.slice';
import styles from './styles.module.scss';

function Header() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { user, lang } = useSelector((state) => state.userReducer);

  const intl = useTranslation(lang);

  const handleLogout = () => {
    dispatch(logout());
    history.push('/login');
  };

  const toggleLocale = (e) => {
    if (e.target.textContent === 'en') {
      dispatch(changeLang('ua'));
    } else {
      dispatch(changeLang('en'));
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <button type="button" title={intl['app-header-lang-button-tip']} onClick={toggleLocale}>{lang}</button>
        <h1>{intl['app-header-title']}</h1>
        {user && (
          <>
            <p>{user.username}</p>
            <button type="button" title={intl['app-header-logout-button-tip']} onClick={handleLogout}>{intl['app-header-logout-button']}</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
