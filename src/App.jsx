import React, { useEffect } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMoviesList } from './store/actions/actions';

import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './Routes/Routes';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer.user);

  useEffect(() => {
    if (user) {
      dispatch(getMoviesList());
    }
  }, [user]);

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

export default App;
