import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import { Home, Gist, GistList } from '../';

/**
 * Main Component with routes
 *
 * @class App
 * @extends {Component}
 */
class App extends Component {
  render() {
    return(
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:user" component={GistList} />
            <Route exact path="/:user/:gist_id" component={Gist} />
          </Switch>
        </div>
      </Router>
    )
  }
};

export default App;
