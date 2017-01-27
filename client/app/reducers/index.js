'use strict';

import {combineReducers} from 'redux';
import test from './test';
import localUser from './localuser';
import home from './home';

const rootReducer = combineReducers({
  test,
  localUser,
  home
});

export default rootReducer;