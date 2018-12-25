const distanceReducer = (state = {}, action = {}) => {
  switch (action.type) {
    case 'DISTANCE_LOADING':
      return {
        ...state,
        [action.tripId]: {
          ...state[action.tripId],
          loading: action.loading,
          error: false,
        },
      };
    case 'DISTANCE_GET':
      return {
        ...state,
      };
    case 'DISTANCE_ERROR':
      return {
        ...state,
        [action.tripId]: {
          error: action.error,
        },
      };
    case 'DISTANCE_LOADED':
      return {
        ...state,
        [action.tripId]: {
          points: action.distance.distance,
        },
      };
    default:
      return state;
  }
};

export default distanceReducer;
