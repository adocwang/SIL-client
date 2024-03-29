'use strict';
import _ from 'lodash'

const role_map = {
    'ROLE_BRANCH_PRESIDENT':['ROLE_BRANCH_PRESIDENT'],//分行行长
    'ROLE_END_PRESIDENT':['ROLE_END_PRESIDENT','ROLE_END_PRESIDENT_WITH_CM'],//支行行长
    'ROLE_CUSTOMER_MANAGER':['ROLE_CUSTOMER_MANAGER','ROLE_END_PRESIDENT_WITH_CM']//客户经理

}

export function isRole(key,role){
    if(role_map[key]){
       var tmp = _.find(role_map[key],function(item){
           return item==role;
       })
        if(tmp==undefined){
            return false;
        }else {
            return true;
        }
    }else {
        return key==role;
    }
}

export function NaviGoBack(navigator) {
    if (navigator && navigator.getCurrentRoutes().length > 1) {
        navigator.pop();
        return true;
    }
    return false;
}

export function isEmptyObject(obj) {
    for (var name in obj) {
        return false;
    }
    return true;
}

export function GapYear(yearStr) {
    var oldDate = new Date(Date.parse(yearStr));
    var nowDate = new Date();
    var gap = nowDate.getFullYear() - oldDate.getFullYear();
    if (gap > 0) {
        return gap
    } else {
        return 0
    }
}


export function getDateDiff(dateTimeStamp) {
    var result;
    var minute = 1000 * 60;
    var hour = minute * 60;
    var day = hour * 24;
    var halfamonth = day * 15;
    var month = day * 30;
    var now = new Date().getTime();
    var diffValue = now - dateTimeStamp*1000;
    if (diffValue < 0) {
        return;
    }
    var monthC = diffValue / month;
    var weekC = diffValue / (7 * day);
    var dayC = diffValue / day;
    var hourC = diffValue / hour;
    var minC = diffValue / minute;
    if (monthC >= 1) {
        result = "" + parseInt(monthC) + "月前";
    }
    else if (weekC >= 1) {
        result = "" + parseInt(weekC) + "周前";
    }
    else if (dayC >= 1) {
        result = "" + parseInt(dayC) + "天前";
    }
    else if (hourC >= 1) {
        result = "" + parseInt(hourC) + "小时前";
    }
    else if (minC >= 1) {
        result = "" + parseInt(minC) + "分钟前";
    } else
        result = "刚刚";
    return result;
}
