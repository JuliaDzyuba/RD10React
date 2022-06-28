import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import movieServices from './services/movieServices';
import { setMoviesListToStore } from './store/actions/actions';

import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './Routes/Routes';

function App(props) {
  useEffect(() => {
    movieServices.getAll()
      .then((data) => {
        if (data.length) {
          props.setMoviesListToStore(data);
        }
      });
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </div>
  );
}

const mapDispatchToProps = {
  setMoviesListToStore,
};

export default connect(null, mapDispatchToProps)(App);

App.propTypes = {
  setMoviesListToStore: PropTypes.func.isRequired,
};
