const metricReducer = (state = {}, action = {}) => {
  let queryState = {...state[action.tripId]};
  queryState = queryState === undefined ? {} : queryState[action.query];
  switch (action.type) {
    case 'METRIC_LOADING':
      return {
        ...state,
        [action.tripId]: {
          ...state[action.tripId],
          [action.query]: {
            ...queryState,
            loading: action.loading,
            error: false,
          },
        },
      };
    case 'METRIC_ERROR':
      return {
        ...state,
        [action.tripId]: {
          [action.query]: {
            error: action.error,
          },
        },
      };
    case 'METRIC_LOADED':
      return {
        ...state,
        [action.tripId]: {
          ...state[action.tripId],
          [action.query]: {
            ...queryState,
            value: action.metric,
            loading: false,
          },
        },
      };
    default:
      return state;
  }
};

export default metricReducer;
