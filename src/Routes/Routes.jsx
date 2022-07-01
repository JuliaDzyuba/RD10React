import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Info from '../components/Info';
import ActorInfoPage from '../pages/ActorInfoPage';
import EditMovie from '../pages/EditMovie';
import Login from '../pages/Login';
import MainPage from '../pages/MainPage';
import NotFound from '../pages/NotFound';
import Registration from '../pages/Registration/Registration';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path="/movies/:movieId" component={Info} />
      <PrivateRoute exact path="/actor/:actorId" component={ActorInfoPage} />
      <PublicRoute exact path="/login" component={Login} />
      <PublicRoute exact path="/registration" component={Registration} />
      <PrivateRoute exact path="/" component={MainPage} />
      <PrivateRoute exact path="/movies/:movieId/edit" component={EditMovie} />
      <Route path="/*" component={NotFound} />
    </Switch>
  );
}

export default Routes;
