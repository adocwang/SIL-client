/**
 * Created by kiefer on 2017/2/3.
 */
'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
    enterprises:[]
};

export default function search (state = initialState, action) {
    switch (action.type) {
        case types.REVEIVE_SEARCH_COMPANY_LIST:
            return Object.assign({}, state,action.data);
        default:
            return state;
    }
}
