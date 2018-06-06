/**
 * Created by yuanjianxin on 2018/3/15.
 */

const WebSocketClient = require('yue-ws-client');

export default {
  install:(Vue)=>{
    Vue.prototype.$wsHandler = WebSocketClient.instance;
  }
}
