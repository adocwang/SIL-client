'use strict';

import {combineReducers} from 'redux';
import home from './home';
import auth from './auth';
import search from './search';
import userloan from './userloan';
import message from './message';
import enterprise from './enterprise';
<<<<<<< HEAD
import {enterpriseList} from './enterprise';
import collection,{uploadImg} from './application.js'
=======
import claimdistribute from './claimdistribute';
>>>>>>> 9d8803652d071a075d3cd2ac8ffde3d809d12f82

const rootReducer = combineReducers({
  home,
  auth,
  search,
  userloan,
  message,
  enterprise,
<<<<<<< HEAD
    enterpriseList,
    collection,
    uploadImg,
=======
  claimdistribute
>>>>>>> 9d8803652d071a075d3cd2ac8ffde3d809d12f82
});

export default rootReducer;