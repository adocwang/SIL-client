/**
 * Created by kiefer on 2017/2/3.
 */
import * as types from '../constants/ActionTypes';

const tabCat = [
    {
        id:'1',
        name:'已受理'
    },
    {
        id:'2',
        name:'审批中'
    },
    {
        id:'3',
        name:'审批通过'
    },
    {
        id:'4',
        name:'签约'
    },
    {
        id:'5',
        name:'放款'
    }];

const mockCompanyInfo = [
    {
        img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
        cat:'能源  投资  >>',
        status:'已分配',
    },
    {
        img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
        cat:'能源  投资  >>',
        status:'已分配',
    },
    {
        img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
        cat:'能源  投资  >>',
        status:'已分配',
    },
    {img:'http://b.thumbs.redditmedia.com/EJAPtfPi82c9uJY5-MkW54HLa_cdeVdQivacIYdjuDI.jpg',
        title:'深圳能源集团股份有限公司',
        desc:'熊佩锦 | 257690.00万美元 | 成立15年以上',
        cat:'能源  投资  >>',
        status:'已分配',
    }]

const initialState = {
    loading: false,
    isLoadMore: true,
    noMore: false,
    catList:tabCat,
    pageList: {1:mockCompanyInfo,2:mockCompanyInfo,3:mockCompanyInfo},
    pageAfter: {1: '', 2: '', 3: ''},
};

export default function userenterprise (state = initialState, action) {
    switch (action.type) {
        case types.UPDATE_HOME_INFO:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
}
