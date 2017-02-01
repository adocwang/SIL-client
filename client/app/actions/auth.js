/**
 * Created by kiefer on 2017/2/1.
 */

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest,getRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchLogin (paramsMap) {
    console.log('fetchLogin',paramsMap)
    return dispatch => {
        dispatch(loginLoding());
        return postRequest(host.PASSWORD_LOGIN_URL ,paramsMap,'iamsuperman')
            .then((data) => {
                if(data.code == 2007){
                    ToastShort('用户不存在');
                }else if(data.code ==2003){
                    ToastShort('密码错误');
                }else if(data.code ==0){
                    dispatch(loginSuccess(data.data));
                }
            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}

export function fetchLogout (token) {
    return dispatch => {
        return getRequest(host.USER_LOGOUT,token)
            .then((data) => {

            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}

export function loadLocalUser (user) {
    return {
        type:types.LOAD_LOCAL_USER,
        data:user
    }
}

function loginSuccess (data) {
    return {
        type: types.LOGIN_SUCCESS,
        data: data,
    }
}

function loginLoding () {
    return {
        type: types.LOGIN_LOADING,
        data: {loading:true},
    }
}