import { combineReducers } from 'redux';

import dataMap from './dataMap';

const rootReducer = combineReducers({
    dataMap: dataMap,
});

export default rootReducer;
