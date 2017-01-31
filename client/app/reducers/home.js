/**
 * Created by kiefer on 2017/1/24.
 */

import * as types from '../constants/ActionTypes';

const homeTabCat = [
    {
        id:'1',
        name:'新增企业'
    },
    {
        id:'2',
        name:'风险企业'
    },
    {
        id:'3',
        name:'最新资讯'
    }];

const mockCompanyInfo = [
    {
        img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
    },
    {
        img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
    },
    {
        img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
    },
    {img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
    }]

const initialState = {
    isRefreshing: false,
    loading: false,
    isLoadMore: true,
    noMore: false,
    catList:homeTabCat,
    pageList: {1:mockCompanyInfo,2:mockCompanyInfo,3:mockCompanyInfo},
    pageAfter: {1: '', 2: '', 3: ''},
    companyInfoUpdate:false
};

export default function home (state = initialState, action) {
    return state
}
