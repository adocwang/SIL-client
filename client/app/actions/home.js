/**
 * Created by kiefer on 2017/1/31.
 */
'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function notifyUpdate (state) {
    return {
        type: types.UPDATE_HOME_INFO,
        data: state
    }
}

export function fetchSearch(paramsMap,token){
    console.log('fetchSearch',paramsMap,token);
    return dispatch => {
        return postRequest(host.ENTERPRISE_LIST_URL ,paramsMap,token)
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
                    dispatch({type:types.FETCH_COMPANY_LIST,data:data.data})
                }

            })
            .catch((error) => {
                ToastShort(error.message);
            })
    }
}