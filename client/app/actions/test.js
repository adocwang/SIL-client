/**
 * Created by kiefer on 2017/1/22.
 */
'use strict';

import * as types from '../constants/ActionTypes';
import {ToastShort} from '../utils/ToastUtils';
import {request} from '../utils/HttpServices';
import * as host from '../constants/Urls';

export function fetchTest () {
    return {
        type: types.FETCH_REDDIT_LIST,
        data: 'change'
    }
}

