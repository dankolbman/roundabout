import {combineReducers} from 'redux';

const lineStringReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'LINESTRING_LOADING':
      return {
        ...state,
        [action.tripId]: {
          ...state[action.tripId],
          loading: action.loading,
          error: false,
        },
      };
    case 'LINESTRING_GET':
      return {
        ...state,
      };
    case 'LINESTRING_ERROR':
      return {
        ...state,
        [action.tripId]: {
          error: action.error,
        },
      };
    case 'LINESTRING_LOADED':
      return {
        ...state,
        [action.tripId]: {
          geoJSON: action.points,
        },
      };
    default:
      return state;
  }
};

export default lineStringReducer;
