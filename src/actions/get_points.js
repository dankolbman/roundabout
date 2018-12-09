import axios from 'axios';

export function getPointsAction(trip) {
    console.log(trip)
    return {
        type: 'POINTS_LOADED',
        payload: trip
    }
}

export function requestTripPointsPageError(hasError, message) {
  return {
    type: 'REQUEST_TRIP_POINTS_PAGE_ERROR',
		hasError,
		message,
  }
}

export function requestTripPointsPageLoading(loading) {
  return {
    type: 'REQUEST_TRIP_POINTS_PAGE_LOADING',
		loading,
  }
}

export function requestTripPointsPageSuccess(data) {
  return {
    type: 'REQUEST_TRIP_POINTS_PAGE_SUCCESS',
		points: data.results,
  }
}

/*
 * Request a page of points for a given trip
 */
export function tripPointsFetchPage(url) {
	return (dispatch) => {
		dispatch(requestTripPointsPageLoading(true));

		axios.get(url)
			.then((response) => {
				if (response.status !== 200) {
					throw Error(response.statusText);
				}

				dispatch(requestTripPointsPageLoading(false));

				return response;
			})
			.then((response) => dispatch(requestTripPointsPageSuccess(response.data)))
			.catch((err) => dispatch(requestTripPointsPageError(true, err)));
	};
}
