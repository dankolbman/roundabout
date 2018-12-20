import React, { Component } from 'react';
import { Link, Route, Switch } from "react-router-dom";
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
              <Link to="/1" activeStyle={{ color: 'red' }}>
                <img src={scooter} width={24} height={24}/>
                The Vietnamese Frontier
              </Link>
            </li>
            <li className="nav-button">
              <Link to='/2' activeStyle={{ backgroundColor: 'red' }}>
                <img src={motorcycle} width={24} height={24}/>
                Zuma and the Guptas
              </Link>
            </li>
            <li className="nav-button">
              <Link to='/3'>
                <img src={tuktuk} width={24} height={24}/>
                Rickshaw Run
              </Link>
            </li>
          </ul>
        </div>

        <Switch>
          <Route
            path="/:tripId"
            component={PointMap}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
