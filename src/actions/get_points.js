import axios from 'axios';

export function getPointsAction(trip) {
    return {
        type: 'POINTS_LOADED',
        payload: trip,
    }
}

export function requestTripPointsPageError(tripId, hasError, message) {
  return {
    type: 'REQUEST_TRIP_POINTS_PAGE_ERROR',
    hasError,
    message,
    tripId,
  }
}

export function requestTripPointsPageLoading(tripId, loading) {
  return {
    type: 'REQUEST_TRIP_POINTS_PAGE_LOADING',
    loading,
    tripId,
  }
}

export function requestTripPointsPageSuccess(tripId, data) {
  return {
    type: 'REQUEST_TRIP_POINTS_PAGE_SUCCESS',
    points: data,
    tripId,
  }
}

/*
 * Request a page of points for a given trip
 */
export function tripPointsFetchPage(tripId, map) {
  const url = `${process.env.REACT_APP_API}/trips/${tripId}/linestring`;
  return (dispatch, getState) => {
    dispatch(requestTripPointsPageLoading(tripId, true));

    axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(requestTripPointsPageLoading(tripId, false));

        return response;
      })
      .then((response) => {
        dispatch(requestTripPointsPageSuccess(tripId, response.data))
        return response
      })
      .then((response) => {
        console.log('update map');
        console.log(map);
        map.getSource('route').setData(getState().points.geoJSON);
        return response
      })
      .catch((err) => dispatch(requestTripPointsPageError(tripId, true, err)));
  };
}
