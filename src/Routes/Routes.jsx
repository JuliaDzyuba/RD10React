import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Info from '../components/Info';
import ActorInfoPage from '../pages/ActorInfoPage';
import MainPage from '../pages/MainPage';

function Routes() {
  return (
    <Switch>
      <Route exact path="/" component={MainPage} />
      <Route exact path="/movies/:movieId" component={Info} />
      <Route exact path="/actor/:actorId" component={ActorInfoPage} />
      <Route path="*">
        <h1 style={{ marginBottom: 'auto' }}>Not found</h1>
      </Route>
    </Switch>
  );
}

export default Routes;
