import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from '../pages/MainPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <Route path="*">
        <h1 style={{ marginBottom: 'auto' }}>Not found</h1>
      </Route>
    </Switch>
  );
}

export default Routes;
