/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import DocPage from './containers/Doc';
import OutputPage from './containers/OutputPage';

export default () => (
  <Router>
    <App>
      <Switch>
        <Route path="/output" component={OutputPage} />
        <Route path="/doc" component={DocPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </App>
  </Router>
);
