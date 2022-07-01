import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ component: Component, ...other }) {
  const user = useSelector((state) => state.userReducer.user);
  const isUserAuth = Boolean(user);

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
