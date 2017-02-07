'use strict';

import {combineReducers} from 'redux';
import test from './test';
import localUser from './localuser';
import home from './home';
import auth from './auth';
import search from './search';
import userenterprise from './userenterprise';
import message from './message';

const rootReducer = combineReducers({
  test,
  localUser,
  home,
  auth,
  search,
  userenterprise,
  message
});

export default rootReducer;