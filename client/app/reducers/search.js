/**
 * Created by kiefer on 2017/2/3.
 */
'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
    enterprises:[],
    loading:false
};

export default function search (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_SEARCH_COMPANY_LIST:
            state.loading = true;
            state.enterprises=[];
            return Object.assign({}, state,action.data);
        case types.REVEIVE_SEARCH_COMPANY_LIST:
            state.loading = false;
            return Object.assign({}, state,action.data);
        default:
            return state;
    }
}
