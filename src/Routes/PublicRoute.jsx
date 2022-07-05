import React from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRoute({ component: Component, ...other }) {
  const user = useSelector((state) => state.user);
  const isUserAuth = Boolean(user);

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
