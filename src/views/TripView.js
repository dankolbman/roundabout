import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PointMap from '../containers/PointMap';
import DistanceContainer from '../containers/DistanceContainer';
import MetricContainer from '../containers/MetricContainer';

export const TripView = ({...props}) => {
  return (
    <div>
      <PointMap />
      {props.match.params.tripId === 3 && (
        <div className="row">
          <MetricContainer name="Cups of Chai" query="chai" unit=" Cups" />
          <MetricContainer name="Breakdowns" query="break" unit="" />
        </div>
      )}
      <DistanceContainer />
    </div>
  );
};

export default withRouter(TripView);
