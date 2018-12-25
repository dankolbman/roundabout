import axios from 'axios';

export function distanceLoading(tripId, loading) {
  return {
    type: 'DISTANCE_LOADING',
    tripId,
    loading,
  };
}

export function distanceError(tripId, error) {
  return {
    type: 'DISTANCE_ERROR',
    error,
  };
}

export function distanceLoaded(tripId, data) {
  return {
    type: 'DISTANCE_LOADED',
    distance: data,
    tripId,
  };
}

export function fetchTripDistance(tripId) {
  tripId = tripId === undefined ? 3 : tripId;
  const url = `${process.env.REACT_APP_API}/trips/${tripId}/distance`;
  return (dispatch, getState) => {
    dispatch(distanceLoading(tripId, true));

    if (getState().distance[tripId].points !== undefined) {
      const data = getState().distance[tripId];
      return data;
    }

    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(distanceLoading(tripId, false));

        return response;
      })
      .then(response => {
        dispatch(distanceLoaded(tripId, response.data));
        return response;
      })
      .catch(err => dispatch(distanceError(tripId, true)));
  };
}
