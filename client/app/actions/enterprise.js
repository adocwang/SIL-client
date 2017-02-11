/**
 * Created by kiefer on 2017/2/8.
 */
import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest,getRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchEnterprise (id,token) {
    if(id==undefined || id==''){
        ToastShort('该企业不存在');
    }

    return dispatch => {
        dispatch(clearLastEnterprise())
        return getRequest(dispatch, host.ENTERPRISE_DETAIL_URL + id, token)
            .then((data) => {
                if (data.code == 0) {
                    console.log(data);
                    dispatch(fetchEnterpriseSuccess(data.data))
                }else {
                    dispatch(hideLoading());
                    ToastShort('该企业不存在');
                }
            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }
}

export function fetchEnterpriseList(paramsMap, token){
    console.log('fetchEnterpriseList',paramsMap,token);
    return dispatch => {
        return postRequest(dispatch,host.ENTERPRISE_LIST_URL ,paramsMap,token)
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


export function fetchEnterpriseSuccess (data) {
    data.loading = false;
    return {
        type:types.FETCH_ENTERPRISE_DETAIL,
        data:data
    }
}

export function hideLoading () {
    return {
        type:types.HIDE_ENTERPRISE_LOADING,
        data:{loading:false}
    }
}

export function clearLastEnterprise () {
    return {
        type:types.CLEAR_LAST_ENTERPRISE_DETAIL,
        data:{}
    }
}