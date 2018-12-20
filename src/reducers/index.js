import { combineReducers } from 'redux';
import pointsReducer from './PointsReducer';
import speedReducer from './SpeedReducer';
import lineStringReducer from './LineStringReducer';

const rootReducer = combineReducers({
    points: pointsReducer,
    lineStrings: lineStringReducer,
    speed: speedReducer,
})

export default rootReducer
