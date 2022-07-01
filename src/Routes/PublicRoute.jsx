import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

function PublicRoute({ component: Component, user, ...other }) {
  const isUserAuth = Boolean(user);

  if (isUserAuth) {
    return <Redirect to="/" />;
  }

  return (
    <Route component={Component} {...other} />
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

export default connect(mapStateToProps, null)(PublicRoute);

PublicRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
};

PublicRoute.defaultProps = {
  user: null,
};
