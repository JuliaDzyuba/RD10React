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
import * as appRoutes from './routesConstants';

function Routes() {
  return (
    <Switch>
      <PrivateRoute exact path={appRoutes.MOVIE_ID} component={Info} />
      <PrivateRoute exact path={appRoutes.ACTOR_ID} component={ActorInfoPage} />
      <PublicRoute exact path={appRoutes.LOGIN} component={Login} />
      <PublicRoute exact path={appRoutes.REGISTRATION} component={Registration} />
      <PrivateRoute exact path={appRoutes.ROOT} component={MainPage} />
      <PrivateRoute exact path={appRoutes.MOVIE_ID_EDIT} component={EditMovie} />
      <Route path={appRoutes.ANY} component={NotFound} />
    </Switch>
  );
}

export default Routes;
