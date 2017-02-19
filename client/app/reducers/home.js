/**
 * Created by kiefer on 2017/1/24.
 */

import * as types from '../constants/ActionTypes';

const homeTabCat = [
    {
        id:1,
        name:'新增企业'
    },
    {
        id:2,
        name:'风险企业'
    },
    {
        id:3,
        name:'最新资讯'
    }];


const initialState = {
    isRefreshing: {1:false,2:false,3:false},
    loading: {1:true,2:false,3:false},
    isLoadMore: {1:false,2:false,3:false},
    noMore: false,
    catList:homeTabCat,
    pageList: {1:[],2:[],3:[]},
    pageAfter: {1: 1, 2: 1, 3: 1},
};

export default function home (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_COMPANY_LIST:
            state.isRefreshing[1] = action.data.isRefreshing;
            state.isLoadMore[1] = action.data.isLoadMore;
            state.loading[1] = action.data.loading;
            return Object.assign({}, state);
        case types.REVEIVE_COMPANY_LIST:
            var newState={}
            state.isRefreshing[1] =false;
            state.isLoadMore[1] =false;
            state.loading[1] = false;
            if(action.data.enterprises.length == 0){
                state.noMore = true;
            }else {
                state.noMore = false;
                if(action.data.isRefreshing){
                    state.pageList[1] = action.data.enterprises;
                    state.pageAfter[1]=2;
                }else {
                    state.pageAfter[1] = state.pageAfter[1] + 1;
                    state.pageList[1] = state.pageList[1].concat(action.data.enterprises)
                }
            }
            return Object.assign({}, state,newState);
        case types.CLEAR_AUTH:
            return initialState;
        default:
            return state;
    }
}
