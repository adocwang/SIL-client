/**
 * Created by kiefer on 2017/2/1.
 */
import * as types from '../constants/ActionTypes';
import realm from '../components/realm'
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
            try {
                realm.write(() => {
                    realm.create('User', action.data);
                });
            }catch (err){
                console.log('realm error',err);
            }

            return Object.assign({}, state, action.data);
        case types.LOGIN_LOADING:
            return Object.assign({}, state, action.data);
        case types.LOAD_LOCAL_USER:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}