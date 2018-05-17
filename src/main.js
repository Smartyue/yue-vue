// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
//vuex store
import store from "./store";
// mint ui
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
// event listener
import Listener from "./lib/Listener";
// websocket handler
import WebSocketHandler from "./lib/WebSocket";
// global functions
import GlobalFunctions from "./lib/GlobalFunctions";
// network handler
import NetworkConfig from "./config/NetworkConfig";
import NetworkHandler from "./lib/NetworkHandler";
// JsBridge
import JsBrdge from "./lib/JsBridge";
Vue.use(MintUI)


Vue.use(Listener)


Vue.use(WebSocketHandler);


Vue.use(GlobalFunctions);

Vue.use(NetworkHandler, NetworkConfig);


Vue.use(JsBrdge);

Vue.config.productionTip = false

/* eslint-disable no-new */
const app=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

