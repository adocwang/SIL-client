/**
 * Created by kiefer on 2017/2/8.
 */
'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
    loading:true,
    isRefreshing:false,
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

const listInitialState = {
    count: 0,
    page_limit:0,
    page_count:0,
    enterprises:[],
}

export default function enterprise (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_ENTERPRISE_DETAIL:
            state.loading = false;
            state.isRefreshing = false;
            storage.save({
                key: 'enterprise',  // 注意:请不要在key中使用_下划线符号!
                id: action.data.id,   // 注意:请不要在id中使用_下划线符号!
                rawData: action.data,
            });
            return Object.assign({}, state,action.data);
        case types.CLEAR_LAST_ENTERPRISE_DETAIL:
            return initialState;
        case types.FETCH_LOCAL_ENTERPRISE_DETAIL:
            state.loading = false;
            state.isRefreshing = false;
            return Object.assign({}, state,action.data);
        case types.REFRESH_ENTERPRISE_DETAIL:
            state.isRefreshing = true;
            return Object.assign({}, state);
        default:
            return state;
    }
}

export  function enterpriseList(state = listInitialState,action) {
    switch (action.type) {
        case types.FETCH_COMPANY_LIST:
            console.log(action.data)
            return Object.assign({}, listInitialState,action.data);
        default:
            return state;
    }
}
