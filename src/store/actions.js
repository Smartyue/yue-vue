/**
 * Created by yuanjianxin on 2018/3/17.
 */

export default {
  //todo

  actionUpdatePhone:({commit,state})=>{
    commit('updatePhone',state.user.phone);
  }

}
