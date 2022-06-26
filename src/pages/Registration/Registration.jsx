import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../store/actions/actions';
import styles from './styles.module.scss';

function Registration(props) {
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
    const localData = JSON.parse(localStorage.getItem('users')) || [];
    localData.push(formValue);
    localStorage.setItem('users', JSON.stringify(localData));
    props.register(formValue);
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

const mapDispatchToProps = {
  register,
};

export default connect(null, mapDispatchToProps)(Registration);

Registration.propTypes = {
  register: PropTypes.func.isRequired,
};
