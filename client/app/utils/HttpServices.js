'use strict';
import * as host from '../constants/Urls';
import * as types from '../constants/ActionTypes';

export function postRequest (dispatch,url,paramsMap,token) {
<<<<<<< HEAD
  console.info("url=", url,{'token':token});
    return fetch(host.BASE_URL + url, {
=======
  console.info("url=", url,{'token':token},paramsMap);
  return fetch(host.BASE_URL + url, {
>>>>>>> 9d8803652d071a075d3cd2ac8ffde3d809d12f82
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

export function uploadImage(dispatch,url,token,uri){
    let formData = new FormData();
    let timestamp = Date.parse(new Date());

    let image = {uri: uri, type: 'multipart/form-data', name: timestamp+'.jpg'};

    formData.append("file",image);
    return fetch(host.BASE_URL + url,{
        method:'POST',
        headers:{
            'Content-Type':'multipart/form-data',
            'Accept': 'application/json',
            'extra':JSON.stringify({'token':token})
        },
        body:formData,
    }).then(response=>response.json()).then(responseJson=>{
        if(responseJson.code==406){
            dispatch({type:types.CLEAR_AUTH,data:{}})
        }
        return responseJson
    });
}

