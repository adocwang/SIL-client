/**
 * Created by kiefer on 2017/2/17.
 */
import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest,getRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchUnReadMessageList (token) {

    return dispatch => {
        return postRequest(dispatch, host.MESSAGE_LIST_URL, {page:1,page_limit:50},token)
            .then((data) => {
                if (data.code == 0) {
                    console.log(data);
                    dispatch({type:types.RECEIVE_MAIN_MESSAGE_LIST,data:data.data})
                }
            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}

export function fetcMessageSet (id,token) {
    return dispatch => {
        dispatch({type:types.SET_MESSAGE_READ,data:{id:id}})
        return postRequest(dispatch, host.MESSAGE_SET_URL, {id:id,state:1},token)
            .then((data) => {
                if (data.code == 0) {
                    console.log(data);
                }
            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}