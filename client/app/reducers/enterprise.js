/**
 * Created by kiefer on 2017/2/8.
 */
'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
    loading:true,
    detail:{},
    id:0,
    address:'',
    bank:'',
    legal_man:'',
    name:'',
    obj_id:'',
    role_a:'',
    role_b:'',
    start:'',
    state:'',
};

export default function enterprise (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_ENTERPRISE_DETAIL:
            return Object.assign({}, state,action.data);
        case types.CLEAR_LAST_ENTERPRISE_DETAIL:
            return initialState;
        default:
            return state;
    }
}