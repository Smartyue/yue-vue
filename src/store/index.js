/**
 * Created by yuanjianxin on 2018/3/17.
 */
import Vue from 'vue'
import Vuex from 'vuex'

// 引入根级别 getters states mutations actions
import getters from './getters'
import state from './state'
import mutations from './mutations'
import actions from './actions'

//todo import modules
import user from './modules/user'


Vue.use(Vuex);
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules:{  //todo
    user
  }
});
