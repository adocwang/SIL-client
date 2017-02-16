/**
 * Created by kiefer on 2017/2/16.
 */

'use strict';

import * as types from '../constants/ActionTypes';

const initialState = {
    responseList:[],
    responseDetail:'点击左侧菜单查看详情',
    loading:false
};

export default function response (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_RESPONSE_LIST:
            state.loading = true;
            state.responseList=[];
            state.responseDetail = '';
            return Object.assign({}, state,action.data);
        case types.RECEIVE_RESPONSE_LIST:
            state.loading = false;
            state.responseList =state.responseList.concat(action.data.cm_tips);
            return Object.assign({}, state,action.data);
        case types.FETCH_RESPONSE_DETAIL:
            state.loading = true;
            return Object.assign({}, state,action.data);
        case types.RECEIVE_RESPONSE_DETAIL:
            state.responseDetail = action.data.content;
            return Object.assign({}, state,action.data);
        case types.HIDE_RESPONSE_LIST_LOADING:
            state.loading = false;
            return Object.assign({}, state);
        default:
            return state;
    }
}