import React from 'react';
import {NavLink} from 'react-router-dom';
import {useQuery} from '@apollo/react-hooks';
import scooter from '../scooter.svg';
import {TRIPS} from '../queries';

const NavBar = () => {
  const {loading, error, data} = useQuery(TRIPS);

  const trips = data && data.trips.edges;

  if (!trips) {
    return 'Loading...';
  }

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
