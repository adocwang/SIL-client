/**
 * Created by kiefer on 2017/2/7.
 */
/**
 * Created by kiefer on 2017/2/2.
 */
'use strict';

import Realm from 'realm';

class Message extends Realm.Object {}
Message.schema = {
    name: 'Message',
    properties: {
        id:  {type: 'int', default: 0},
        img: 'string',
        title: 'string',
        desc: 'string',
        cat: 'string',
        status: 'string',
        read:'bool'
    },
};


export default new Realm({schema: [Message]});
