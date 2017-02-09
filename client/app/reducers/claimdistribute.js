/**
 * Created by kiefer on 2017/2/9.
 */
import * as types from '../constants/ActionTypes';

const initialState = {
    loadingBankList:false,
    bankList:[],
    loadingUserList:false,
    userList:[]
};

export default function claimdistribute (state = initialState, action) {
    switch (action.type) {
        case types.REVEIVE_BANK_LIST:
            state.loadingBankList = false;
            state.bankList = action.data;
            return Object.assign({}, state);
        case types.FETCH_BANK_LIST:
            state.loadingBankList = true;
            return Object.assign({}, state);
        case types.REVEIVE_USER_LIST:
            state.loadingUserList = false;
            state.userList = action.data.users;
            return Object.assign({}, state);
        case types.FETCH_USER_LIST:
            state.loadingUserList = true;
            return Object.assign({}, state);
        default:
            return state;
    }
}