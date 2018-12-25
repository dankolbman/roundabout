import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PointMap from '../containers/PointMap';
import DistanceContainer from '../containers/DistanceContainer';

export const TripView = ({...props}) => {
  return (
    <div>
      <PointMap />
      <DistanceContainer />
    </div>
  );
};

export default withRouter(TripView);
