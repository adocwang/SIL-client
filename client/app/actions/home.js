/**
 * Created by kiefer on 2017/1/31.
 */
'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {request} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function notifyUpdate (state) {
    return {
        type: types.UPDATE_HOME_INFO,
        data: state
    }
}