/**
 * Created by kiefer on 2017/1/31.
 */
'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest,getRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';


export function fetchEnterpriseList(paramsMap, token){
    return dispatch => {
        dispatch({type:types.FETCH_SEARCH_COMPANY_LIST,data:{}})
        return postRequest(dispatch,host.ENTERPRISE_LIST_URL ,paramsMap,token)
            .then((data) => {
                if(data.code == 2007){
                    ToastShort('用户不存在');
                }else  if(data.code == 1003){
                    ToastShort('缺少参数');
                }else  if(data.code == 407){
                    ToastShort('无权限');
                }else  if(data.code == 406){
                    ToastShort('用户无权限');
                }else if(data.code==0){
                    dispatch({type:types.REVEIVE_SEARCH_COMPANY_LIST,data:data.data})
                }
                dispatch(hideLoading());

            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }
}

export function fetchHomeEnterpriseList(isRefreshing, loading, isLoadMore,paramsMap, token){
    console.log('fetchHomeEnterpriseListi',isRefreshing, loading, isLoadMore,paramsMap);
    return dispatch => {
        dispatch({type:types.FETCH_COMPANY_LIST,
            data:{
                isRefreshing:isRefreshing,
                loading:loading,
                isLoadMore:isLoadMore
        }})
        return postRequest(dispatch,host.ENTERPRISE_LIST_URL ,paramsMap,token)
            .then((data) => {
                console.log('fetchHomeEnterpriseList',data);
                if(data.code == 2007){
                    ToastShort('用户不存在');
                    dispatch(hideLoading());
                }else  if(data.code == 1003){
                    ToastShort('缺少参数');
                    dispatch(hideLoading());
                }else  if(data.code == 407){
                    ToastShort('无权限');
                    dispatch(hideLoading());
                }else  if(data.code == 406){
                    ToastShort('用户无权限');
                    dispatch(hideLoading());
                }else if(data.code==0){
                    data.data.isRefreshing = isRefreshing;
                    if(isLoadMore && data.data.enterprises.length == 0){
                        ToastShort('没有更多数据了');
                    }
                    dispatch({type:types.REVEIVE_COMPANY_LIST,data:data.data})
                }


            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }

}


export function fetchBankList(token){
    return dispatch => {
        //dispatch({type:types.FETCH_BANK_LIST,data:{}})
        return getRequest(dispatch,host.BANK_LIST_URL ,token)
            .then((data) => {
                console.log('fetchBankList',data);
                if(data.code==0){
                    dispatch({type:types.REVEIVE_BANK_LIST,data:data.data})
                }
                dispatch(hideLoading());
            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }
}

export function fetchUserList(token){
    return dispatch => {
        dispatch({type:types.FETCH_USER_LIST,data:{}})
        return postRequest(dispatch,host.USER_LIST_URL ,{page:1,page_limit:100,role_en_name:'ROLE_CUSTOMER_MANAGER'},token)
            .then((data) => {
                console.log('fetchUserList',data);
                if(data.code==0){
                    dispatch({type:types.REVEIVE_USER_LIST,data:data.data})
                }
                dispatch(hideLoading());
            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }
}

export function fetchEnterpiseSet(paramsMap,token){
    console.log('fetchEnterpiseSet',paramsMap);
    return dispatch => {
        dispatch({type:types.FETCH_ENTERPRISE_SET,data:{}})
        return postRequest(dispatch,host.ENTERPRISE_SET_URL ,paramsMap,token)
            .then((data) => {
                console.log('fetchEnterpiseSet',data);
               if(data.code==1003){
                   dispatch(hideLoading());
                   ToastShort('缺少参数');
               }else if(data.code==2007){
                   dispatch(hideLoading());
                   ToastShort('银行不存在');
               }else if(data.code==2008){
                   dispatch(hideLoading());
                   ToastShort('角色不存在');
               }else if(data.code==2009){
                   dispatch(hideLoading());
                   ToastShort('角色不是客户经理');
               }else if(data.code==407){
                   ToastShort('无权限');
                   dispatch(hideLoading());
               }else if(data.code==0){
                   dispatch({type:types.REVEIVE_ENTERPRISE_SET,data:data.data})
               }

            })
            .catch((error) => {
                dispatch(hideLoading());
                ToastShort(error.message);
            })
    }
}

function hideLoading(){
    return{
        type: types.HIDE_LOADING,
        data: {},
    }
}