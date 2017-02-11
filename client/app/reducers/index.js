'use strict';

import {combineReducers} from 'redux';
import home from './home';
import auth from './auth';
import search from './search';
import userenterprise from './userenterprise';
import message from './message';
import enterprise from './enterprise';
import {enterpriseList} from './enterprise';
import collection,{uploadImg} from './application.js'

const rootReducer = combineReducers({
  home,
  auth,
  search,
  userenterprise,
  message,
  enterprise,
    enterpriseList,
    collection,
    uploadImg,
});

export default rootReducer;