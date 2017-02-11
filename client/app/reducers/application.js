/**
 * Created by kiefer on 2017/1/24.
 */

import * as types from '../constants/ActionTypes';

const initialState = [];

const uploadInitialState = {
    resourceId: ""
}

export default function collection(state = initialState, action) {
    switch (action.type) {
        case types.COLLECTION_CONFIG:
            const objs = JSON.parse(action.data)
            return objs
        default:
            return state;
    }
}

export function uploadImg(state = uploadInitialState, action) {
    switch (action.type) {
        case types.RESOURCE_UPLOAD:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
