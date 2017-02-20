/**
 * Created by kiefer on 2017/2/7.
 */
import * as types from '../constants/ActionTypes';
import _ from 'lodash'
const mockMessageInfo = [
]

const initialState = {
    messageList: mockMessageInfo,
    isRefreshing: false,
    isLoadMore: false,
    noMore: false,
    pageAfter: 2,
    loading:false
};

export default function message(state = initialState, action) {
    switch (action.type) {
        case types.RECEIVE_MAIN_MESSAGE_LIST:
            state.messageList = action.data.messages;
            return Object.assign({}, state);
        case types.FETCH_MESSAGE_LIST:
            state.isRefreshing = action.data.isRefreshing;
            state.isLoadMore = action.data.isLoadMore;
            state.loading = action.data.loading;
            return Object.assign({}, state);
        case types.RECEIVE_MESSAGE_LIST:
            state.isRefreshing = false;
            state.isRefreshing =false;
            state.isLoadMore =false;
            state.loading = false;
            if(action.data.messages.length == 0){
                state.noMore = true;
            }else {
                state.noMore = false;
                if(action.data.isRefreshing){
                    state.messageList = action.data.messages;
                    state.pageAfter = 2;
                }else {
                    state.pageAfter = state.pageAfter  + 1;
                    state.messageList  = state.messageList .concat(action.data.messages)
                }
            }
            return Object.assign({}, state);
        case types.SET_MESSAGE_READ:
            _.forEach(state.messageList, function (o) {
                if (o.id = action.data.id) {
                    o.state = 1;
                }
            })
            return Object.assign({}, state);
        case types.RECEIVE_PUSH_MESSAGE:
            console.log(state.messageList,action.data);
            var unread = _.find(state.messageList, function (item) {
                return item.id == action.data.id ;
            })
            if(unread == undefined){
                state.messageList.unshift(action.data);
            }
            return Object.assign({}, state);
        case types.CLEAR_AUTH:
            return initialState;
        default:
            return state;
    }
}