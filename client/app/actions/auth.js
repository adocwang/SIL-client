/**
 * Created by kiefer on 2017/2/1.
 */

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest,getRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchLogin (paramsMap) {
    return dispatch => {
        return postRequest(dispatch,host.PASSWORD_LOGIN_URL ,paramsMap,'')
            .then((data) => {
                if(data.code ==0){
                    dispatch(loginSuccess(data.data));
                }else {
                    dispatch(LoginFailed({code:data.code}));
                }
                dispatch(hideLoading());
            })
            .catch((error) => {
                ToastShort(error.message);
                dispatch(hideLoading());
            })
    }
}

export function fetchLogout (token) {
    return dispatch => {
        dispatch(clearAuth());
        return getRequest(dispatch,host.USER_LOGOUT_URL,token)
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}

export function fetchSmsCode (phone) {
    return dispatch => {
        return postRequest(dispatch,host.SEND_LOGIN_SMS_URL ,{phone:phone},'')
            .then((data) => {
                console.log(data);
                if(data.code ==0){
                }else {
                    dispatch(LoginFailed({smsCode:data.code}));
                }
            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}


export function fetchSmsLogin(paramsMap){
    console.log('fetchSmsLogin',paramsMap);
    return dispatch => {
        return postRequest(dispatch,host.SMS_LOGIN_URL ,paramsMap,'')
            .then((data) => {
                console.log(data);
                if(data.code ==0){
                    dispatch(smsLoginSuccess(data.data));
                }else {
                    dispatch(LoginFailed({smsCode:data.code}));
                }
                dispatch(hideLoading());
            })
            .catch((error) => {
                ToastShort(error.message);
                dispatch(hideLoading());
            })
    }
}

export function fetchUserSet(paramsMap,token){
    console.log('fetchUserSet',paramsMap,token);
    return dispatch => {
        return postRequest(dispatch,host.USER_SET_URL ,paramsMap,token)
            .then((data) => {
                console.log(data);
                if(data.code == 2007){
                    ToastShort('用户不存在');
                }else  if(data.code == 1003){
                    ToastShort('缺少参数');
                }else  if(data.code == 407){
                    ToastShort('无权限');
                }else  if(data.code == 406){
                    ToastShort('用户无权限');
                }
                dispatch({
                    type: types.SET_USER_INFO_SUCCESS,
                    data: {code:data.code},
                });
            })
            .catch((error) => {
                ToastShort(error.message);
                dispatch(hideLoading());
            })
    }
}

export function fetchUserGet(paramsMap,token){

    return dispatch => {

        return postRequest(dispatch,host.USER_GET_URL ,paramsMap,token)
            .then((data) => {
                console.log(data);

                if(data.code == 2007){
                    ToastShort('用户不存在');
                }else  if(data.code == 1003){
                    ToastShort('缺少参数');
                }else  if(data.code == 407){
                    ToastShort('无权限');
                }else  if(data.code == 406){
                    ToastShort('用户无权限');
                }
                dispatch({
                    type: types.GET_USER_INFO_SUCCESS,
                    data: {code:data.code},
                });
            })
            .catch((error) => {
                ToastShort(error.message);
                dispatch(hideLoading());
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

function smsLoginSuccess(data){
    return {
        type: types.LOGIN_SUCCESS,
        data: data,
    }
}
function LoginFailed(data){
    return {
        type: types.LOGIN_FAILED,
        data: data,
    }
}

function clearAuth(){
    return{
        type: types.CLEAR_AUTH,
        data: {},
    }
}

function hideLoading(){
    return{
        type: types.HIDE_LOADING,
        data: {loading:false},
    }
}

function loginLoding () {
    return {
        type: types.LOGIN_LOADING,
        data: {loading:true},
    }
}
