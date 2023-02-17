import Vuex from 'vuex';

import Auth from './Auth';

import Request from './Request';
import User from './User';
import Attr from './Attr';

export default new Vuex.Store({
    modules: {
        Auth,
        Request,
        User,
        Attr,
    }
})