/**
 * Created by kiefer on 2017/2/9.
 */
import * as types from '../constants/ActionTypes';

const initialState = {
    loadingBankList:true,
    bankList:[],
    loadingUserList:true,
    zhuliUserList:[],
    xieliUserList:[],
    setEnterpriseInfoSuccess:false
};

export default function claimdistribute (state = initialState, action) {
    switch (action.type) {
        case types.REVEIVE_BANK_LIST:
            state.loadingUserList = false
            state.setEnterpriseInfoSuccess = false;
            state.zhuliUserList = [],
            state.xieliUserList = [],
            state.bankList = action.data;
            return Object.assign({}, state);
        case types.FETCH_BANK_LIST:
            state.loadingBankList = true;
            return Object.assign({}, state);
        case types.REVEIVE_USER_LIST:
            var list = action.data.users;
            state.zhuliUserList =JSON.parse(JSON.stringify(list));
            state.xieliUserList = JSON.parse(JSON.stringify(list));
            return Object.assign({}, state);
        case types.FETCH_USER_LIST:
            state.loadingUserList = true;
            return Object.assign({}, state);
        case types.FETCH_ENTERPRISE_SET:
            state.loadingUserList = true;
            state.loadingBankList = true;
            return Object.assign({}, state);
        case types.REVEIVE_ENTERPRISE_SET:
            state.setEnterpriseInfoSuccess = true;
            state.loadingUserList = false;
            return Object.assign({}, state);
        case types.USER_LIST_CHANGE:
            if(action.data.type=='zhuli'){
                state.zhuliUserList.forEach((item)=>{
                    if(item.id!=action.data.item.id){
                        item.isChecked = false;
                    }else if(item.isChecked){
                        item.isChecked = false;
                    }else {
                        item.isChecked = true;
                    }
                })
            }else {
                state.xieliUserList.forEach((item)=>{
                    if(item.id!=action.data.item.id){
                        item.isChecked = false;
                    }else if(item.isChecked){
                        item.isChecked = false;
                    }else {
                        item.isChecked = true;
                    }
                })
            }
            return Object.assign({}, state);
        case types.HIDE_LOADING:
            state.loadingBankList = false;
            state.loadingUserList = false;
            return Object.assign({}, state);
        case types:CLEAR_STATUS:
            return initialState;
        default:
            return state;
    }
}