import Vue from 'vue';
import Vuex from 'vuex';

import admin from './modules/admin'
import map from './modules/admin/modules/map'

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        admin,
        map
    }
})
