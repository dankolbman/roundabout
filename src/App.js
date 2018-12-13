import React, { Component } from 'react';
import PointMap from './containers/PointMap';
import './styles/main.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <span className="App-logo">dankolbman(x,y,z)</span>

          <ul className="nav-buttons">
            <li className="nav-button">
              <a  href="#">The Vietnamese Frontier</a>
            </li>
            <li className="nav-button">
              <a  href="#">Zuma and the Guptas</a>
            </li>
            <li className="nav-button">
              <a  href="#">Rickshaw Run</a>
            </li>
          </ul>
        </div>
        <PointMap />
      </div>
    );
  }
}

export default App;
