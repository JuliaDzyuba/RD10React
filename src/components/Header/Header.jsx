import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { logout } from '../../store/actions/actions';
import styles from './styles.module.scss';

function Header(props) {
  const history = useHistory();

  const handleLogout = () => {
    props.logout();
    history.push('/login');
  };

  return (
    <header className={styles.header}>
      <h1>Movies</h1>
      {props.user && (
        <>
          <p>{props.user.username}</p>
          <button type="button" onClick={handleLogout}>Logout</button>
        </>
      )}
    </header>
  );
}

const mapStateToProps = (state) => ({
  user: state.userReducer.user,
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  logout: PropTypes.func.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string,
    password: PropTypes.string,
  }),
};

Header.defaultProps = {
  user: null,
};
