/**
 * Created by kiefer on 2017/1/21.
 */
'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
   data:'init'
};

export default function test (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_REDDIT_LIST:
            console.log('FETCH_REDDIT_LIST',action);
            return Object.assign({}, state, {
                data:action.data
            });
        case types.RECEIVE_REDDIT_LIST:
            return Object.assign({}, state, {

            });
        default:
            return state;
    }
}

