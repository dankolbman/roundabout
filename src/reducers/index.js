import {combineReducers} from 'redux';
import pointsReducer from './PointsReducer';
import speedReducer from './SpeedReducer';
import distanceReducer from './DistanceReducer';
import lineStringReducer from './LineStringReducer';
import metricReducer from './MetricReducer';

const rootReducer = combineReducers({
  points: pointsReducer,
  lineStrings: lineStringReducer,
  speed: speedReducer,
  distance: distanceReducer,
  metrics: metricReducer,
});

export default rootReducer;
