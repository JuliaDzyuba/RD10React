import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Info from '../components/Info';
import ActorInfoPage from '../pages/ActorInfoPage';
import EditMovie from '../pages/EditMovie';
import Login from '../pages/Login';
import MainPage from '../pages/MainPage';
import NotFound from '../pages/NotFound';
import Registration from '../pages/Registration/Registration';
import * as appRoutes from './routesConstants';

function Routes() {
  return (
    <Switch>
      <Route exact path={appRoutes.MOVIE_ID} component={Info} />
      <Route exact path={appRoutes.ACTOR_ID} component={ActorInfoPage} />
      <Route exact path={appRoutes.LOGIN} component={Login} />
      <Route exact path={appRoutes.REGISTRATION} component={Registration} />
      <Route exact path={appRoutes.ROOT} component={MainPage} />
      <Route exact path={appRoutes.MOVIE_ID_EDIT} component={EditMovie} />
      <Route path={appRoutes.ANY} component={NotFound} />
    </Switch>
  );
}

export default Routes;
