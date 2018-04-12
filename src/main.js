// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//vuex store
import store from './store'

// mint ui
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// event listener
import Listener from './lib/Listener'
Vue.use(Listener)

// websocket handler
import WebSocketHandler from './lib/WebSocket'
Vue.use(WebSocketHandler);

// global functions
import GlobalFunctions from './lib/GlobalFunctions'
Vue.use(GlobalFunctions);

// network handler
import NetworkConfig from './config/NetworkConfig'
import NetworkHandler from './lib/NetworkHandler'
Vue.use(NetworkHandler,NetworkConfig);

// JsBridge
import JsBrdge from './lib/JsBridge'
Vue.use(JsBrdge);

Vue.config.productionTip = false

/* eslint-disable no-new */
const app=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// const renderer=require('vue-server-renderer').createRenderer()
//
// renderer.renderToString(app,(err,html)=>{
//   if (err) throw err
//   console.log(html)
// })
