import React from 'react';
import {useQuery} from '@apollo/react-hooks';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import TripView from './views/TripView';
import './styles/main.scss';

import NavBar from './components/Navbar';
import {TRIPS} from './queries';

const App = () => {
  const {loading, error, data} = useQuery(TRIPS);
  const trips = data && data.trips.edges;

  return (
    <div className="App">
      <div className="App-header">
        <div className="Logo">
          <span className="App-logo">dankolbman(x,y,z)</span>
        </div>
        <NavBar trips={trips} loading={loading || !trips} />
      </div>

      <Switch>
        <Route exact path="/">
          {trips && trips.length > 0 ? (
            <Redirect to={`/${trips[0].node.id}`} />
          ) : (
            <span>Loading...</span>
          )}
        </Route>
        <Route path="/:tripId?" component={props => <TripView {...props} />} />
      </Switch>
    </div>
  );
};

export default withRouter(App);
