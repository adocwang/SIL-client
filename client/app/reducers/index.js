'use strict';

import {combineReducers} from 'redux';
import home from './home';
import auth from './auth';
import search from './search';
import userenterprise from './userenterprise';
import message from './message';
import enterprise from './enterprise';
import claimdistribute from './claimdistribute';

const rootReducer = combineReducers({
  home,
  auth,
  search,
  userenterprise,
  message,
  enterprise,
  claimdistribute
});

export default rootReducer;