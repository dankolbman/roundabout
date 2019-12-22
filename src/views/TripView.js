import React, {Component} from 'react';
import {useQuery} from '@apollo/react-hooks';
import {withRouter} from 'react-router';
import PointMap from '../containers/PointMap';
import DistanceContainer from '../containers/DistanceContainer';
import MetricContainer from '../containers/MetricContainer';
import {TRIP} from '../queries';

export const TripView = ({match}) => {
  const tripId = match.params.tripId;
  const {loading, error, data} = useQuery(TRIP, {
    variables: {tripId: tripId},
  });

  const trip = data && data.trip;

  return (
    <>
      <PointMap trip={trip} />
      {tripId === undefined && (
        <div className="row">
          <MetricContainer name="Cups of Chai" query="chai" unit=" Cups" />
          <MetricContainer name="Breakdowns" query="break" unit="" />
        </div>
      )}
      <DistanceContainer distances={trip && trip.distance} />
    </>
  );
};

export default TripView;
