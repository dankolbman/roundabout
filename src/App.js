import React, {Component} from 'react';
import {NavLink, Route, Switch} from 'react-router-dom';
import PointMap from './containers/PointMap';
import tuktuk from './tuktuk.svg';
import motorcycle from './motorcycle.svg';
import scooter from './scooter.svg';
import './styles/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <span className="App-logo">dankolbman(x,y,z)</span>

          <ul className="nav-buttons">
            <li className="nav-button">
              <NavLink exact to="/">
                <img src={scooter} width={24} height={24} />
                The Vietnamese Frontier
              </NavLink>
            </li>
            <li className="nav-button">
              <NavLink to="/2">
                <img src={motorcycle} width={24} height={24} />
                Zuma and the Guptas
              </NavLink>
            </li>
            <li className="nav-button">
              <NavLink to="/3">
                <img src={tuktuk} width={24} height={24} />
                Rickshaw Run
                {Math.floor(Date.now() / 1000) < 1547942400 && (
                  <span className="badge">en-route</span>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        <Switch>
          <Route path="/:tripId?" component={PointMap} />
        </Switch>
      </div>
    );
  }
}

export default App;
