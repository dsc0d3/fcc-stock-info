// libraries
import React                 from 'react';
import { Route, IndexRoute } from 'react-router';

// app components
import App              from '../components/App';
import ChartComponent   from '../components/ChartComponent';
import About            from '../components/About';
import UnMatchedRoutes  from '../components/UnMatchedRoutes';

let routes = (
  <Route
    path='/'
    component={App}>
    <IndexRoute
      component={ChartComponent}/>
    <Route
      path='about'
      name='about'
      component={About}/>
    <Route name="404" path="*" component={UnMatchedRoutes}/>
  </Route>
);

export default routes;
