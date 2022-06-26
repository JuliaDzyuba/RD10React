import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Footer from './components/Footer';
import Header from './components/Header';
import Routes from './Routes/Routes';

function App() {
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
