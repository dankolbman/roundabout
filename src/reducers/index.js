import { combineReducers } from 'redux';
import pointsReducer from './PointsReducer';

const rootReducer = combineReducers({
    points: pointsReducer,
})

export default rootReducer
