import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import useTranslation from '../../hooks/useTranslation';
import { login } from '../../store/slices/user.slice';
import styles from './styles.module.scss';

function Login() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const history = useHistory();
  const dispatch = useDispatch();

  const { lang } = useSelector((state) => state.userReducer);
  const intl = useTranslation(lang);

  const handleSubmit = (e) => {
    e.prevent.default();
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existUser = users && users.find((i) => i.username === formValue.username);
    if (users.length && existUser && existUser.password === formValue.password) {
      dispatch(login(formValue));
      history.push('/');
    } else {
      setError('Username or password is incorrect');
    }
  };

  return (
    <div className={styles.container}>
      <h1>{intl['app-loginpage-title']}</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <label htmlFor="username">
          {intl['app-loginpage-login-label']}
          <input
            type="text"
            name="username"
            id="username"
            placeholder={intl['app-loginpage-login-placeholder']}
            value={formValue.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          {intl['app-loginpage-password-label']}
          <input
            type="password"
            name="password"
            id="password"
            placeholder={intl['app-loginpage-password-placeholder']}
            value={formValue.password}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleClick}>{intl['app-loginpage-button-text']}</button>
      </form>
      <p>
        {intl['app-loginpage-question']}
        {' '}
        <Link to="/registration">
          {intl['app-loginpage-suggestion']}
        </Link>
      </p>
    </div>
  );
}

export default Login;
