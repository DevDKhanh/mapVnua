import { combineReducers } from 'redux';

import dataMap from './dataMap';
import overImage from './editOverImage';

const rootReducer = combineReducers({
    dataMap: dataMap,
    overImage,
});

export default rootReducer;
