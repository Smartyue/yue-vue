/**
 * Created by yuanjianxin on 2018/3/16.
 */
import Vue from 'vue'
const baseUrl='http://192.168.1.34:4000/'
let config={

  _beforeHttpFunc:function (para,headers={}) {
    //todo
    para=Object.assign({},{appId:'yue'},para)

    //console.log('=====Vue',Vue);
    return {para,headers}
  },

  _afterHttpFunc:function (res) {
    //todo
    if(res.code!=='OK'){
      Vue.$messagebox.alert('网络异常！请稍后再试');
      return null;
    }
    return res.data;
  },



  GET_VERIFY_QUESTION:{ method:'get',url:'verifyQuestion'},
  SEND_SMS:{ method:'post',url:'sendSMS'},
  LOGIN:{ method:'post',url:'login'},
  GET_WS_INFO:{method:'post',url:'getWebSocketInfo'},

}

Object.keys(config).forEach(v=>config[v].url=baseUrl+config[v].url);
export default config
