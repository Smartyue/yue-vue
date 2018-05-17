/**
 * Created by yuanjianxin on 2018/3/16.
 */
import Vue from "vue";
const baseUrl = 'http://127.0.0.1:8081/'
let config={

  _beforeHttpFunc:function (para,headers={}) {
    //todo

    if (para instanceof FormData)
      return {para, headers};

    para=Object.assign({},{appId:'yue'},para)

    return {para,headers}
  },

  _afterHttpFunc:function (res) {
    //todo

    if (res && res.code == 200)
      return res.data;

    //这里处理下未捕获的异常
    if (res.code == 'error')
      return Vue.$messagebox.alert('网络异常！请稍后再试');

    return Vue.$messagebox.alert(res.message);
  },



  GET_VERIFY_QUESTION:{ method:'get',url:'verifyQuestion'},
  TEST_UPLOAD: {method: 'post', url: 'test'},
  SEND_SMS:{ method:'post',url:'sendSMS'},
  LOGIN:{ method:'post',url:'login'},
  GET_WS_INFO:{method:'post',url:'getWebSocketInfo'},

}

Object.keys(config).forEach(v=>config[v].url=baseUrl+config[v].url);
export default config
