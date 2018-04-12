/**
 * Created by yuanjianxin on 2018/3/17.
 */

/**
 * 根级别 mutation
 */

import { UPDATE_AUTH_KEY } from './mutation-types'
export default {
  [UPDATE_AUTH_KEY](state,payload){
    state.authKey=payload
  },

  updatePhone:(state,phone)=>state.phone=phone

}
