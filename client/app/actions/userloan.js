/**
 * Created by kiefer on 2017/2/10.
 */
import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest,getRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchUserLoanList(isRefreshing, loading, isLoadMore,paramsMap, token,tabIndex){

    return dispatch => {
        dispatch({type:types.FETCH_USER_LOAN_LIST,
            data:{
                isRefreshing:isRefreshing,
                loading:loading,
                isLoadMore:isLoadMore,
                tabIndex:tabIndex
            }})
        switch (tabIndex){
            case 0:
                paramsMap.progress = '0';
                break;
            case 1:
                paramsMap.progress = '1,2,3';
                break;
            case 2:
                paramsMap.progress = '4';
                break;
            case 3:
                paramsMap.progress = '5';
                break;
            case 4:
                paramsMap.progress = '6';
                break;
            default:

        }
        console.log('fetchHomeEnterpriseList',isRefreshing, loading, isLoadMore,paramsMap,tabIndex);
        return postRequest(dispatch,host.LOAN_LIST_URL ,paramsMap,token)
            .then((data) => {
                console.log(data);
                if(data.code == 2007){
                    ToastShort('用户不存在');
                    dispatch(hideLoading(tabIndex));
                }else  if(data.code == 1003){
                    ToastShort('缺少参数');
                    dispatch(hideLoading(tabIndex));
                }else  if(data.code == 407){
                    ToastShort('无权限');
                    dispatch(hideLoading(tabIndex));
                }else  if(data.code == 406){
                    ToastShort('用户无权限');
                    dispatch(hideLoading(tabIndex));
                }else if(data.code==0){

                    data.data.isRefreshing = isRefreshing;
                    data.data.tabIndex = tabIndex;
                    if(isLoadMore && data.data.loans.length == 0){
                        ToastShort('没有更多数据了');
                    }
                    dispatch({type:types.REVEIVE_USER_LOAN_LIST,data:data.data})
                }


            })
            .catch((error) => {
                dispatch(hideLoading(tabIndex));
                ToastShort(error.message);
            })
    }

}

function hideLoading(tabIndex){
    return{
        type: types.HIDE_USER_LOAN_LOADING,
        data: {tabIndex:tabIndex},
    }
}