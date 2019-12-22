import React from 'react';
import {NavLink} from 'react-router-dom';
import scooter from '../scooter.svg';

const NavBar = ({trips, loading}) => {
  return (
    <ul className="nav-buttons">
      {trips &&
        trips.map(({node}) => (
          <li key={node.id} className="nav-button">
            <NavLink to={`/${node.id}`}>
              <img src={scooter} width={24} height={24} alt="scooter" />
              {node.name}
            </NavLink>
          </li>
        ))}
    </ul>
  );
};

export default NavBar;
