/**
 * Created by yuanjianxin on 2018/3/15.
 */

const heartCheck = {
  timeout: 60000,//60秒
  timeoutObj: null,
  serverTimeoutObj: null,
  reset:function(){
    clearTimeout(this.timeoutObj);
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function(ws){
    let self = this;
    this.timeoutObj = setTimeout(function(){
      //这里发送一个心跳，后端收到后，返回一个心跳消息，
      //onmessage拿到返回的心跳就说明连接正常
      ws.send("HeartBeatPing");
      self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
        ws.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      }, self.timeout)
    }, this.timeout)
  }
}


class web_socket{

  static get instance(){
    if(!web_socket._instance)
      web_socket._instance=new web_socket();
    return web_socket._instance;
  }

  constructor(){
    this.ws=null;
    this.lockReconnect=false;
    this.url=null;
    this.token=null;
    this.onMessage=null;
  }

  get client(){
    return this.ws;
  }

  createWebSocket(_url,_token,omFuc) {
    this.url=_url;
    this.token=_token;
    omFuc && (this.onMessage=omFuc);
    try{
      this.ws=new WebSocket(_url,_token)
      this.initEventHandler();
    }catch (e){
      this.reconnect(_url,_token);
    }
  }


  initEventHandler() {
    this.ws.onopen=(data)=>{
      console.log('==webSocket connect success!==',data);
      //心跳检测重置
      heartCheck.reset().start(this.ws);
    }

    this.ws.onmessage=(event)=>{
      console.log('====onmessage',event.data);
      //如果获取到消息，心跳检测重置
      //拿到任何消息都说明当前连接是正常的
      heartCheck.reset().start(this.ws);

      event.data!=='HeartBeatPong' &&  this.onMessage && this.onMessage(event.data);
    }


    this.ws.onclose=(data)=> {
      console.log('====websocket close====')
      this.reconnect(this.url,this.token);
    }

    this.ws.onerror=()=>{
      console.log('====websocket error===')
      this.reconnect(this.url,this.token);
    }
  }

  reconnect(url,token) {
    console.log('====reconnect ws ',new Date().getSeconds())
    if(this.lockReconnect)
      return;
    this.lockReconnect = true;
    //没连接上会一直重连，设置延迟避免请求过多
    setTimeout(()=>{
      this.createWebSocket(url,token);
      this.lockReconnect = false;
    }, 2000);
  }
}


const _websocket={
  install:(Vue)=>{
    Vue.prototype.$wsHandler=web_socket.instance;
  }
}

export default _websocket
