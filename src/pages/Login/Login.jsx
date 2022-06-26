import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

function Login() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState('');

  const history = useHistory();

  const handleSubmit = (e) => {
    e.prevent.default();
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.username === formValue.username && user.password === formValue.password) {
      history.push('/');
    } else {
      setError('Username or password is incorrect');
    }
  };

  return (
    <div className={styles.container}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        {error && <p className={styles.error}>{error}</p>}
        <label htmlFor="username">
          Login
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Enter your name..."
            value={formValue.username}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password..."
            value={formValue.password}
            onChange={handleChange}
          />
        </label>
        <button type="button" onClick={handleClick}>Login</button>
      </form>
      <p>
        Don&#39;t have an account?
        {' '}
        <Link to="/registration">
          Go to the Registration page
        </Link>
      </p>
    </div>
  );
}

export default Login;
