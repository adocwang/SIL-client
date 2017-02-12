/**
 * Created by kiefer on 2017/2/7.
 */
import * as types from '../constants/ActionTypes';

const mockMessageInfo = [
    {
        id:1,
        title:'商务小贴士',
        desc:'您还有企业未曾认领，请尽快认领！',
        createTime:'16:53',
        item_id:22,
        type:1,
        read:false
    },
    {
        id:2,
        title:'商务小贴士',
        desc:'您还有企业未曾认领，请尽快认领！',
        createTime:'16:53',
        type:2,
        item_id:20,
        read:true
    },
    {
        id:3,
        title:'商务小贴士',
        desc:'您还有企业未曾认领，请尽快认领！',
        createTime:'16:53',
        type:1,
        item_id:21,
        read:false
    },
    ]

const initialState = {
   messageList:mockMessageInfo,
    isRefreshing:false
};

export default function home (state = initialState, action) {
           switch (action.type){
               case types.FETCH_MESSAGE_LIST:
                   state.isRefreshing = true;
                   return Object.assign({}, state);
               case types.RECEIVE_MESSAGE_LIST:
                   state.isRefreshing = false;
                   return Object.assign({}, state);
               default:
                   return state;
           }
}