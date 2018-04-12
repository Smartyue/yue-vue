/**
 * Created by yuanjianxin on 2018/3/17.
 */
// example

const state={
  phone:null,
}

const getters={
  phone:state=>state.phone
}


const mutations={
  updatePhone:(state,phone)=>state.phone=phone
}


const actions={
  something:async ({commit,state})=>{
    //todo something
    // await xxx ...
    commit('updatePhone',888);
  }
}


export default {
  namespaced: true,
  state,getters,mutations,actions
}
