'use strict';
import * as host from '../constants/Urls';
import * as types from '../constants/ActionTypes';

export function postRequest (dispatch,url,paramsMap,token) {
  console.info("url=", url,{'token':token},paramsMap);
  return fetch(host.BASE_URL + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'extra':JSON.stringify({'token':token})
    },
    body: JSON.stringify(paramsMap)
  }).then(response=>response.json()).then(responseJson=>{
    if(responseJson.code==406){
      dispatch({type:types.CLEAR_AUTH,data:{}})
    }
    return responseJson
  });
}


export function getRequest (dispatch,url,token) {
  console.info("url=", url);
  return fetch(host.BASE_URL + url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'extra':JSON.stringify({'token':token})
    },
  }).then(response=>response.json()).then(responseJson=>{
    if(responseJson.code==406){
      dispatch({type:types.CLEAR_AUTH,data:{}})
    }
    return responseJson
  });
}
