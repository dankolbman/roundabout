import {combineReducers} from 'redux';
import pointsReducer from './PointsReducer';
import speedReducer from './SpeedReducer';
import distanceReducer from './DistanceReducer';
import lineStringReducer from './LineStringReducer';

const rootReducer = combineReducers({
  points: pointsReducer,
  lineStrings: lineStringReducer,
  speed: speedReducer,
  distance: distanceReducer,
});

export default rootReducer;
