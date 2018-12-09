import { combineReducers } from 'redux';

const pageError = (state = {'error': false, 'message': ''}, action = {}) => {
  switch(action.type) {
		case 'REQUEST_TRIP_POINTS_PAGE_ERROR':
			return {
				error: action.hasError,
				message: action.message,
			}
		default:
			return state;
  }
}

const pageLoading = (state = false, action = {}) => {
  switch(action.type) {
		case 'REQUEST_TRIP_POINTS_PAGE_LOADING':
			return action.loading;
		default:
			return state;
	}
}

const pageSuccess = (state = [], action = {}) => {
  switch(action.type) {
		case 'REQUEST_TRIP_POINTS_PAGE_SUCCESS':
			return action.points;
		default:
			return state;
	}
}


export default combineReducers({
	items: pageSuccess,
	pageError,
	pageLoading,
});
