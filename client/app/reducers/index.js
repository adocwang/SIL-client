'use strict';

import {combineReducers} from 'redux';
import test from './test';
import localUser from './localuser';
import home from './home';
import auth from './auth';

const rootReducer = combineReducers({
  test,
  localUser,
  home,
  auth
});

export default rootReducer;