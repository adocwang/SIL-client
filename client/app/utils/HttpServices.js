'use strict';
import * as host from '../constants/Urls';

export function postRequest (url,paramsMap,token) {
  console.info("url=", url,{'token':token});
  return fetch(host.BASE_URL + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'extra':JSON.stringify({'token':token})
    },
    body: JSON.stringify(paramsMap)
  }).then(response=>response.json());
}

export function getRequest (url,token) {
  console.info("url=", url);
  return fetch(host.BASE_URL + url, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'extra':JSON.stringify({'token':token})
    },
  }).then(response=>response.json());
}

export function request (url) {
  console.info("url=", url);
  return fetch(url).then(response=>response.json());
}