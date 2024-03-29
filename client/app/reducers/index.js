'use strict';

import {combineReducers} from 'redux';
import home from './home';
import auth from './auth';
import search from './search';
import userloan from './userloan';
import message from './message';
import enterprise from './enterprise';
import {enterpriseList, findingEnterprise, enterpriseList2} from './enterprise';
import collection, {uploadImg, commonNet} from './application.js'
import claimdistribute from './claimdistribute';
import response from './response';
import responsesearch from './responsesearch';

const rootReducer = combineReducers({
    home,
    auth,
    search,
    userloan,
    message,
    enterprise,
    enterpriseList,
    collection,
    uploadImg,
    claimdistribute,
    commonNet,
    findingEnterprise,
    enterpriseList2,
    response,
    responsesearch

});

export default rootReducer;