import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRoute({ component: Component, ...other }) {
  const isUserAuth = Boolean(localStorage.getItem('user'));

  if (isUserAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Route component={Component} {...other} />
  );
}

export default PublicRoute;

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
