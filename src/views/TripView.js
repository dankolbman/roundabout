import React, {Component} from 'react';
import {withRouter} from 'react-router';
import PointMap from '../containers/PointMap';
import DistanceContainer from '../containers/DistanceContainer';
import MetricContainer from '../containers/MetricContainer';

export const TripView = ({tripId}) => {
  return (
    <>
      <PointMap tripId={tripId} />
      {tripId === undefined && (
        <div className="row">
          <MetricContainer name="Cups of Chai" query="chai" unit=" Cups" />
          <MetricContainer name="Breakdowns" query="break" unit="" />
        </div>
      )}
      <DistanceContainer />
    </>
  );
};

export default TripView;
