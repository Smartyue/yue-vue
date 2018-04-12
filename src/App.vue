<template>
  <div id="app">
    <router-view/>

    <!-- pop field -->
        <mt-popup style="width: 100%" v-model="popupVisible" position="top">
             <div>
               <span>{{pop_msg}}</span>
             </div>
        </mt-popup>

    <template  v-if="showTabVisible">
    <mt-tabbar v-model="selected" :fixed="tab_fixed">
      <mt-tab-item id="外卖">
        <img slot="icon" src="./assets/logo.png">
        外卖
      </mt-tab-item>
      <mt-tab-item id="订单">
        <img slot="icon" src="./assets/logo.png">
        订单
      </mt-tab-item>
      <mt-tab-item id="发现">
        <img slot="icon" src="./assets/logo.png">
        发现
      </mt-tab-item>
      <mt-tab-item id="我的">
        <img slot="icon" src="./assets/logo.png">
        我的
      </mt-tab-item>
    </mt-tabbar>
    </template>



  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
      return {
        msg: 'Welcome to Your Vue.js App',
        popupVisible:false,
        pop_msg:null,
        tab_fixed:true,
        selected:"外卖",
        showTabVisible:false
      }
  },
  watch:{
    selected:function(old_v,new_v){
      console.log('===selected',old_v,new_v);
    }
  },
  created(){
     this.$listener.$on('aaa',(data)=>{
       console.log('====App.vue popup====',data);
       this.pop_msg=data;
       this.popupVisible=true;
     })



     this.$listener.$on('createWS',async (data)=>{
        console.log('====create WS start====');
        let res=await this.$networkHandler.sendRequest('GET_WS_INFO',{},{'Authorization':'Bearer '+this.$store.getters.authKey});
        console.log('====createWS',res);
            this.$wsHandler.createWebSocket(res.data,this.$store.getters.authKey,(data)=>{
              this.$listener.$emit('aaa',data)
            });
     })







  },


}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
