import React from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import TripView from './views/TripView';
import './styles/main.scss';

import NavBar from './components/Navbar';

const App = () => (
  <div className="App">
    <div className="App-header">
      <div className="Logo">
        <span className="App-logo">dankolbman(x,y,z)</span>
      </div>
      <NavBar />
    </div>

    <Switch>
      <Route path="/:tripId?" component={props => <TripView {...props} />} />
    </Switch>
  </div>
);

export default withRouter(App);
