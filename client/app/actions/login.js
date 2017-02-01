/**
 * Created by kiefer on 2017/2/1.
 */

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {postRequest} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchLogin (paramsMap) {
        return postRequest(host.PASSWORD_LOGIN_URL ,paramsMap)
            .then((data) => {
                console.log(data);
                dispatch(loginSuccess(data.data));
            })
            .catch((error) => {
                ToastShort(error.message);
            })
}


function loginSuccess (data) {
    return {
        type: types.LOGIN_SUCCESS,
        data: data,
    }
}