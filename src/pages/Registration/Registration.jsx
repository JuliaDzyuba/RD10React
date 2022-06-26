import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styles from './styles.module.scss';

function Registration() {
  const [formValue, setFormValue] = useState({
    username: '',
    password: '',
  });

  const history = useHistory();

  const handleSubmit = (e) => {
    e.prevent.default();
  };

  const handleChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify(formValue));
    history.push('/');
  };

  return (
    <div className={styles.container}>
      <h1>Please register</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="button" onClick={handleClick}>Register</button>
      </form>
      <p>
        Already have account?
        {' '}
        <Link to="/login">
          Go to the Login page
        </Link>
      </p>
    </div>
  );
}

export default Registration;
