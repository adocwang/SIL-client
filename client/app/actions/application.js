/**
 * Created by kiefer on 2017/1/31. finding.template
 */
'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {getRequest,uploadImage,postRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchCollectionConfig(token){
    console.log("sss")

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