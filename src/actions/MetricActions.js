import axios from 'axios';

export function metricLoading(tripId, query, loading) {
  return {
    type: 'METRIC_LOADING',
    tripId,
    query,
    loading,
  };
}

export function metricError(tripId, query, error) {
  return {
    type: 'METRIC_ERROR',
    tripId,
    query,
    error,
  };
}

export function metricLoaded(tripId, query, data) {
  return {
    type: 'METRIC_LOADED',
    tripId,
    query,
    metric: data.count,
  };
}

export function fetchTripMetric(tripId, query) {
  tripId = tripId === undefined ? 3 : tripId;
  const url = `${
    process.env.REACT_APP_API
  }/trips/${tripId}/points?search=${query}`;
  return (dispatch, getState) => {
    dispatch(metricLoading(tripId, query, true));

    if (getState().metrics[tripId][query].value !== undefined) {
      const data = getState().metrics[tripId];
      return data;
    }

    axios
      .get(url)
      .then(response => {
        if (response.status !== 200) {
          throw metricError(response.statusText);
        }

        dispatch(metricLoading(tripId, query, false));

        return response;
      })
      .then(response => {
        dispatch(metricLoaded(tripId, query, response.data));
        return response;
      })
      .catch(err => dispatch(metricError(tripId, query, true)));
  };
}
