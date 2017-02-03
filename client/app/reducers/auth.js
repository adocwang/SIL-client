/**
 * Created by kiefer on 2017/2/1.
 */
import * as types from '../constants/ActionTypes';
//import realm from '../components/realm'

const initialState = {
    id: 0,
    phone:'',
    true_name: '',
    token: '',
    role: '',
    bank: '',
};

export default function auth (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            //try {
            //    realm.write(() => {
            //        realm.create('User', action.data);
            //    });
            //}catch (err){
            //    console.log('realm error',err);
            //}

            storage.save({
                key: 'user',  // 注意:请不要在key中使用_下划线符号!
                rawData: action.data,
                // 如果不指定过期时间，则会使用defaultExpires参数
                // 如果设为null，则永不过期
                expires: null
            });


            return Object.assign({}, state, action.data);
        case types.LOGIN_LOADING:
            return Object.assign({}, state, action.data);
        case types.LOAD_LOCAL_USER:
            return Object.assign({}, state, action.data);
        case types.SMS_LOGIN_SUCCESS:
            return Object.assign({}, state, action.data);
        case types.SET_USER_INFO_SUCCESS:
            return Object.assign({}, state, action.data);
        case types.HIDE_LOADING:
            console.log('HIDE_LOADING',action.data);
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}