'use strict';

import {combineReducers} from 'redux';
import test from './test';
import localUser from './localuser';

const rootReducer = combineReducers({
  test,
  localUser,
});

export default rootReducer;