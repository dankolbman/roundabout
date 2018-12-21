import axios from 'axios';

export function lineStringLoading(tripId, loading) {
  return {
    type: 'LINESTRING_LOADING',
    tripId,
    loading,
  };
}

export function lineStringError(tripId, error) {
  return {
    type: 'LINESTRING_ERROR',
    error,
  };
}

export function lineStringLoaded(tripId, data) {
  return {
    type: 'LINESTRING_LOADED',
    points: data,
    tripId,
  };
}

/*
 * Request a page of points for a given trip
 */
export function fetchTripLineString(tripId, map) {
  tripId = tripId === undefined ? 1 : tripId;
  const url = `${process.env.REACT_APP_API}/trips/${tripId}/linestring`;
  return (dispatch, getState) => {
    dispatch(lineStringLoading(tripId, true));

    if (getState().lineStrings[tripId].geoJSON !== undefined) {
      const data = getState().lineStrings[tripId].geoJSON;
      map.getSource('route').setData(data);
      return data;
    }

    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(lineStringLoading(tripId, false));

        return response;
      })
      .then(response => {
        dispatch(lineStringLoaded(tripId, response.data));
        return response;
      })
      .then(response => {
        map.getSource('route').setData(response.data);
        return response;
      })
      .catch(err => dispatch(lineStringError(tripId, true)));
  };
}
