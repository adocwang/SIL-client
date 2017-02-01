'use strict';
import * as host from '../constants/Urls';

export function postRequest (url,paramsMap) {
  console.info("url=", url);
  return fetch(host.BASE_URL + url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'extra':{'token':'iamsuperman'}
    },
    body: JSON.stringify(paramsMap)
  }).then(response=>response.json());
}

