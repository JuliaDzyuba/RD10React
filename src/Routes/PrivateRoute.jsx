import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...other }) {
  const isUserAuth = Boolean(localStorage.getItem('user'));

  if (!isUserAuth) {
    return <Redirect to="/login" />;
  }

  return (
    <Route component={Component} {...other} />
  );
}

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
