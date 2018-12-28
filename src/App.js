import React, {Component} from 'react';
import {NavLink, Route, Switch, withRouter} from 'react-router-dom';
import TripView from './views/TripView';
import tuktuk from './tuktuk.svg';
import motorcycle from './motorcycle.svg';
import scooter from './scooter.svg';
import './styles/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <div className="Logo">
            <span className="App-logo">dankolbman(x,y,z)</span>
          </div>

          <ul className="nav-buttons">
            <li className="nav-button">
              <NavLink to="/1">
                <img src={scooter} width={24} height={24} alt="scooter" />
                The Vietnamese Frontier
              </NavLink>
            </li>
            <li className="nav-button">
              <NavLink to="/2">
                <img src={motorcycle} width={24} height={24} alt="motorcycle" />
                Zuma and the Guptas
              </NavLink>
            </li>
            <li className="nav-button">
              <NavLink exact to="/">
                <img src={tuktuk} width={24} height={24} alt="rickshaw" />
                Rickshaw Run
                {Math.floor(Date.now() / 1000) < 1547942400 && (
                  <span className="badge">en-route</span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route
            path="/:tripId?"
            component={props => <TripView {...props} />}
          />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
