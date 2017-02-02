/**
 * Created by kiefer on 2017/2/2.
 */
'use strict';

import Realm from 'realm';

class User extends Realm.Object {}
User.schema = {
    name: 'User',
    properties: {
        id:  {type: 'int', default: 0},
        phone: 'string',
        true_name: 'string',
        token: 'string',
        role: 'string',
        bank: 'string',
    },
};

class Test extends Realm.Object {}
Test.schema = {
    name: 'Test',
    properties: {
        id:  {type: 'int', default: 0},
        name: 'string',
    },
};

export default new Realm({schema: [User,Test]});
