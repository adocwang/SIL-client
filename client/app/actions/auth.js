/**
 * Created by kiefer on 2017/2/1.
 */

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest,getRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchLogin (paramsMap) {
    return dispatch => {
        return postRequest(host.PASSWORD_LOGIN_URL ,paramsMap,'iamsuperman')
            .then((data) => {
                if(data.code == 2007){
                    ToastShort('用户不存在');
                }else if(data.code ==2003){
                    ToastShort('密码错误');
                }else if(data.code ==0){
                    dispatch(loginSuccess(data.data));
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
        return getRequest(host.USER_LOGOUT_URL,token)
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
        return postRequest(host.SEND_LOGIN_SMS_URL ,{phone:phone},'')
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}


export function fetchSmsLogin(paramsMap){
    console.log('fetchSmsLogin',paramsMap);
    return dispatch => {
        return postRequest(host.SMS_LOGIN_URL ,paramsMap,'')
            .then((data) => {
                console.log(data);
                if(data.code == 2007){
                    ToastShort('用户不存在');
                }else if(data.code == 2006){
                    ToastShort('短信验证码已用');
                }else if(data.code == 2005){
                    ToastShort('短信验证码错误');
                }else if(data.code ==0){
                    dispatch(smsLoginSuccess(data.data));
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
        return postRequest(host.USER_SET_URL ,paramsMap,token)
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
