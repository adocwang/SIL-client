/**
 * Created by kiefer on 2017/2/3.
 */
import * as types from '../constants/ActionTypes';

const TabCat = [
    {
        id:1,
        name:'已受理'
    },
    {
        id:2,
        name:'审批中'
    },
    {
        id:3,
        name:'审批通过'
    },
    {
        id:4,
        name:'签约'
    },
    {
        id:5,
        name:'放款'
    }];


const initialState = {
    isRefreshing: {1:false,2:false,3:false,4:false,5:false},
    loading: {1:true,2:false,3:false,4:false,5:false},
    isLoadMore: {1:false,2:false,3:false,4:false,5:false},
    noMore: false,
    catList:TabCat,
    pageList: {1:[],2:[],3:[],4:[],5:[]},
    pageAfter: {1: 1, 2: 1, 3: 1,4:1,5:1},
};

export default function userloan (state = initialState, action) {
    switch (action.type) {
        case types.FETCH_USER_LOAN_LIST:
            var tabIndex = action.data.tabIndex + 1;
            state.isRefreshing[tabIndex] = action.data.isRefreshing;
            state.isLoadMore[tabIndex] = action.data.isLoadMore;
            state.loading[tabIndex] = action.data.loading;
            return Object.assign({}, state);
        case types.REVEIVE_USER_LOAN_LIST:
            var tabIndex = action.data.tabIndex + 1;
            var newState={}
            state.isRefreshing[tabIndex] =false;
            state.isLoadMore[tabIndex] =false;
            state.loading[tabIndex] = false;
            if(action.data.loans.length == 0){
                state.noMore = true;
            }else {
                state.noMore = false;
                if(action.data.isRefreshing){
                    state.pageList[tabIndex] = action.data.loans;
                    state.pageAfter[tabIndex]=2;
                }else {
                    state.pageAfter[tabIndex] = state.pageAfter[tabIndex] + 1;
                    state.pageList[tabIndex] = state.pageList[tabIndex].concat(action.data.loans)
                }
            }
            return Object.assign({}, state,newState);
        case types.HIDE_USER_LOAN_LOADING:
            var tabIndex = action.data.tabIndex;
            state.isRefreshing[tabIndex] =false;
            state.isLoadMore[tabIndex] =false;
            state.loading[tabIndex] = false;
            return Object.assign({}, state);
        default:
            return state;
    }
}
