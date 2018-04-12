/**
 * Created by yuanjianxin on 2018/3/17.
 */


/**
 * 根级别 getter
 */

import { UPDATE_AUTH_KEY } from './mutation-types'

export default {
  authKey:state=>{
    //从localStorage中更新authKey 以防state刷新后失效
    state.authKey===null && localStorage.hasOwnProperty('YueAuthKey') && (state.commit(UPDATE_AUTH_KEY,localStorage.getItem('YueAuthKey')));
    console.log('111')
    return state.authKey;
  },
  phone:state=>state.phone
}
