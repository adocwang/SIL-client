/**
 * Created by kiefer on 2017/2/17.
 */
import * as types from '../constants/ActionTypes';

const initialState = {
    searchResult:"",
    loading:false
};

export default function responsesearch(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_RESPONSE_SEARCH:
            state.loading = true;
            state.searchResult='';
            return Object.assign({}, state,action.data);
        case types.RECEIVE_RESPONSE_SEARCH:
            state.loading = false;
            state.searchResult = "<style type='text/css'> em{color: #a1d3e0}</style>" + action.data
            return Object.assign({}, state,{});
        case types.CLEAR_RESPONSE_SEARCH:
            initialState.loading=false;
            return initialState
        case types.HIDE_RESPONSE_SEARCH_LOADING:
            state.loading = false;
            return Object.assign({}, state);
        default:
            return state;
    }
}