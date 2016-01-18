import 'babel-polyfill';

// libraries
import React    from 'react';
import ReactDOM from 'react-dom';
import {RelayRouter} from 'react-router-relay';

import { Router, useRouterHistory } from 'react-router';
import { hashHistory }        from 'react-router';

// routes
import routes from './routes/routes';


// rendering
ReactDOM.render(
  <RelayRouter 
    history={hashHistory}
    routes={routes}
  />,
  document.getElementById('root')
);
