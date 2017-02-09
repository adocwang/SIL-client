'use strict';

export function NaviGoBack (navigator) {
  if (navigator && navigator.getCurrentRoutes().length > 1) {
    navigator.pop();
    return true;
  }
  return false;
}

export function isEmptyObject (obj) {
  for (var name in obj) {
    return false;
  }
  return true;
}

export function GapYear(yearStr){
  var oldDate = new Date(Date.parse(yearStr));
  var nowDate = new Date();
  var gap = nowDate.getFullYear() -  oldDate.getFullYear();
  if(gap > 0){
    return gap
  }else {
    return 0
  }
}