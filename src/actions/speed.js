import axios from 'axios';

export function getSpeedAction(trip) {
    console.log(trip)
    return {
        type: 'SPEED_LOADED',
        payload: trip
    }
}

export function requestTripSpeedPageError(hasError, message) {
  return {
    type: 'REQUEST_TRIP_SPEED_PAGE_ERROR',
    hasError,
    message,
  }
}

export function requestTripSpeedPageLoading(loading) {
  return {
    type: 'REQUEST_TRIP_SPEED_PAGE_LOADING',
    loading,
  }
}

export function requestTripSpeedPageSuccess(data) {
  return {
    type: 'REQUEST_TRIP_SPEED_PAGE_SUCCESS',
    points: data.speed,
  }
}

/*
 * Request a page of speed for a given trip
 */
export function tripSpeedFetchPage(url) {
  console.log('fetching');
  return (dispatch) => {
    dispatch(requestTripSpeedPageLoading(true));

    axios.get(url)
      .then((response) => {
        if (response.status !== 200) {
          throw Error(response.statusText);
        }

        dispatch(requestTripSpeedPageLoading(false));

        return response;
      })
      .then((response) => {
        dispatch(requestTripSpeedPageSuccess(response.data))
      })
      .catch((err) => dispatch(requestTripSpeedPageError(true, err)));
  };
}
