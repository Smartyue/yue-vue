/**
 * Created by yuanjianxin on 2018/3/14.
 */
export default {
  name: 'HelloWorld',

  created(){
    console.log('===authKey',this.$store.getters.authKey);
    let authKey=this.$store.getters.authKey;
    if(authKey!==null ){
      this.$listener.$emit('createWS');
    }
  },

  methods:{

    toLogin(){
      this.$router.push('/login')
    },

    testClick(){

      this.$jsBridge.addEventListener({
        handlerName:'test1',
        callback:this.showPop
      })


      let that=this;
      this.$jsBridge.dispatch({
        handlerName:'test',
        callback:({data,msg,code})=>{
          that.$listener.$emit('aaa','原生回来了！！！'+msg+'|'+code+'|'+data.result.et2);
        }
      });

      this.$toast('ok');

    },
    loadTop(){
      console.log('====loadTop')
      this.list=[4,5,6]
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom(){
      console.log('=====loadBottom')
      this.list=[...this.list,'x',1];
      console.log('=====allLoaded',this.allLoaded)
      this.$refs.loadmore.onBottomLoaded();
    },

    action1(){
      console.log('===action1')
    },

    action2(){
      console.log('===action2')
    },
    actionShow(){
      this.sheetVisible=true;
    },
    showPop({code,msg,data}){
      // this.$wsHandler.client.send('么么哒');
      this.$toast(data);
      this.$messagebox.prompt(msg,code).then(res=>{
        console.log('===res',res);
        this.$wsHandler.client.send(res.value);
      }).catch(err=>{
        console.log('===cacel');
      })
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      allLoaded:false,
      sheetVisible:false,
      list:[1,2,3,1,2,3,1,2,3,1,2,3,1,2,3],
      actions:[
        {
          name:'test1',
          method:this.action1
        },
        {
          name:'test2',
          method:this.action2
        }
      ],
      popupVisible:false
    }
  }
}
