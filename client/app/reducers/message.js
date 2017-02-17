/**
 * Created by kiefer on 2017/2/7.
 */
import * as types from '../constants/ActionTypes';
import _ from 'lodash'
const mockMessageInfo = [

    ]

const initialState = {
   messageList:mockMessageInfo,
   isRefreshing:false
};

export default function home (state = initialState, action) {
           switch (action.type){
               case types.RECEIVE_MAIN_MESSAGE_LIST:
                   state.messageList =  state.messageList.concat(action.data.messages);
                   return Object.assign({}, state);
               case types.FETCH_MESSAGE_LIST:
                   state.isRefreshing = true;
                   return Object.assign({}, state);
               case types.RECEIVE_MESSAGE_LIST:
                   state.isRefreshing = false;
                   return Object.assign({}, state);
               case types.SET_MESSAGE_READ:
                    _.forEach(state.messageList,function(o){
                        if(o.id = action.data.id){
                            o.state=1;
                        }
                    })
                   return Object.assign({}, state);
               default:
                   return state;
           }
}