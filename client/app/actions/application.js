/**
 * Created by kiefer on 2017/1/31. finding.template
 */
'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {getRequest,uploadImage,postRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchCollectionConfig(token){

    return dispatch => {
        return getRequest(dispatch,host.COLLECTION_GET_URL,token)
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
                }else if(data.code==0){
                    dispatch({type:types.COLLECTION_CONFIG,data:data.data})
                }
            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}
//id pass(-1,1) un_pass_reason
export function passCollection(params,token){
    return dispatch => {
        return postRequest(dispatch,host.PASS_COLLECTION,params,token)
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
                }else if(data.code==0){
                    dispatch({type:types.PASS_COLLECTION_RESUTL,data:data.data})
                }
            })
            .catch((error) => {
                // ToastShort(error.message);
            })
    }
}

export function delFinding(id,token) {
    return dispatch => {
    return postRequest(dispatch,host.DELETE_FINDING,{id:id},token)
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
            }else if(data.code==0){
                dispatch({type:types.DELETE_FINDDING_RESULT,data:data.data})
            }
        })
        .catch((error) => {
            // ToastShort(error.message);
        })
}
}

export function submitCollectionConfig(params,token) {
    return dispatch => {
        return postRequest(dispatch,host.COLLECTION_PUT_URL,params,token)
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
                }else if(data.code==0){
                    dispatch({type:types.SUBMIT_FINDING,data:data.data})
                }
            })
            .catch((error) => {
                // ToastShort(error.message);
            })
    }
}

export function uploadImg(uri,token){
    return dispatch => {
        return uploadImage(dispatch,host.RESOURCE_UPLOAD_URL,token,uri)
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
                }else if(data.code==0){
                    dispatch({type:types.RESOURCE_UPLOAD,data:data.data})
                }
            })
            .catch((error) => {
                ToastShort("图片上传失败")
                dispatch({type:types.RESOURCE_UPLOAD,data:data.data})
            })
    }
}

export function fetchResponseList(params,token){
    return dispatch => {
        dispatch({type:types.FETCH_RESPONSE_LIST,data:{}})
        return postRequest(dispatch,host.RESPONSE_LIST_URL ,params,token)
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
                }else if(data.code==0){
                    dispatch({type:types.RECEIVE_RESPONSE_LIST,data:data.data})
                }
                dispatch(hideLoading());

            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }
}

export function fetchResponseDetail(id,token){
    return dispatch => {
        dispatch({type:types.FETCH_RESPONSE_DETAIL,data:{}})
        return getRequest(dispatch,host.RESPONSE_DETAIL_URL + id ,token)
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
                }else if(data.code==0){
                    dispatch({type:types.RECEIVE_RESPONSE_DETAIL,data:data.data})
                }
                dispatch(hideLoading());

            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }
}

export function fetchSearchResponse(keyword,token){
    return dispatch => {
        dispatch({type:types.FETCH_RESPONSE_SEARCH,data:{}})
        return getRequest(dispatch,host.RESPONSE_SEARCH_URL + keyword ,token)
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
                }else if(data.code==0){
                    dispatch({type:types.RECEIVE_RESPONSE_SEARCH,data:data.data})
                }
                dispatch(hideSearchLoading());

            })
            .catch((error) => {
                dispatch(hideSearchLoading());
                ToastShort(error.message);
            })
    }
}


function hideLoading(){
    return{
        type: types.HIDE_RESPONSE_LIST_LOADING,
        data: {},
    }
}


function hideSearchLoading(){
    return{
        type: types.HIDE_RESPONSE_SEARCH_LOADING,
        data: {},
    }
}