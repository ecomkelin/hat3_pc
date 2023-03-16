import Vuex from 'vuex';

import Auth from './Auth';

import Request from './Request';
import User from './User';
import Attr from './Attr';
import Cateb from './Cateb';
import Catef from './Catef';
import Pd from './Pd';
import Order from './Order';

export default new Vuex.Store({
    modules: {
        Auth,
        Request,
        User,
        Attr,
        Cateb,
        Catef,
        Pd,
        Order,
    }
})