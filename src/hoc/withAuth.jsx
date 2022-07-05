import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

const withAuth = (Component) => {
  function AuthRoute(props) {
    const { user } = useSelector((state) => state.userReducer);
    const isUserAuth = Boolean(user);
    if (!isUserAuth) {
      if (Component.name === 'Login' || Component.name === 'Registration') {
        return <Component {...props} />;
      }
      return <Redirect to="/login" />;
    }
    if (Component.name !== 'Login' && Component.name !== 'Registration') {
      return <Component {...props} />;
    }
    return <Redirect to="/" />;
  }
  return AuthRoute;
};

export default withAuth;
