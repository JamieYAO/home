/*
@flow
*/

'use-strict';

import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';
import constants from './widget/constants';

/*
import { Router, Route, Link, browserHistory, IndexRedirect } from 'react-router'
const Router = require('react-router/lib/Router');
const Route = require('react-router/lib/Route');
const IndexRedirect = require('react-router/lib/IndexRedirect');
const withRouter = require('react-router/lib/withRouter');
const useRouterHistory = require('react-router/lib/useRouterHistory');

const createHistory = require('history').createHistory;
*/

import {MainScene} from './scenes';

class App extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<MainScene />
		);
	}
}

/*
* This is react-router.
*
const browserHistory = useRouterHistory(createHistory)({
  // Note that all `Route.path` properties are relative to this history `basename`
  basename: (constants.ROUTE_PATHS.ROOT)
});

const routes = (
  <Router  history={browserHistory}>
    <Route path={constants.ROUTE_PATHS.ROOT} component={MainScene}>
      <IndexRedirect to={constants.ROUTE_PATHS.HOME} />
      <Route path={constants.ROUTE_PATHS.HOME} component={MainScene} />
      <Route path={constants.ROUTE_PATHS.NOTE} component={MainScene} />
      <Route path={constants.ROUTE_PATHS.ARTICLE} component={MainScene} />
    </Route>
  </Router>
);
*/

ReactDOM.render(<App/>, document.getElementById('main_content'));
