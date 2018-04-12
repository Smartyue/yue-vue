/**
 * Created by yuanjianxin on 2018/3/14.
 */
export default {
  methods:{

    /**
     * 点击获取验证码
     */
    async sendCaptcha(){

      //todo 检测手机号 正则
      if(!this.phone)
        return this.$toast('请输入手机号');

      this.$indicator.open();
      let res=await this.$networkHandler.sendRequest('GET_VERIFY_QUESTION')
      this.$indicator.close();
      if(!res)
        return undefined;

      this.captcha_question=res.question;
      this.question_id=res.question_id;

      this.$messagebox.prompt(this.captcha_question,'请证明你是地球人').then(res=>{
        if(!res.value || res.value.toString().trim()==='')
           return this.$toast('验证失败');
        this.sendSMS(res.value);
      }).catch(e=>{});
    },

    async sendSMS(answer){
      this.$indicator.open();
      let res=await this.$networkHandler.sendRequest('SEND_SMS',{question_id:this.question_id,answer,phone:this.phone});
      this.$indicator.close();
      if(!res)
        return this.$toast('验证失败');

      this.$toast({
        message: '发送成功',
        iconClass: 'mintui mintui-success'
      })

      this.tickSecond();
      this.tickSecondInterval=setInterval(v=>this.tickSecond(),1000);
    },


    tickSecond(){
      this.seconds-=1;
      if(this.seconds===0){
        clearInterval(this.tickSecondInterval);
        this.seconds=10;
        this.captcha_btn_text='获取验证码';
        this.captcha_disable=false;
        return undefined;
      }
      this.captcha_disable=true;
      this.captcha_btn_text=this.seconds+'s';
    },


    async login(){
      if(!this.phone)  //todo phone preg
        return this.$toast('请输入手机号');

      if(!this.captcha_disable)
        return this.$toast('请先获取短信验证码');

      if(!this.captcha)
        return this.$toast('请输入短信验证码');

      // todo login

      //
      // this.$store.commit('user/updatePhone',this.phone);
      //
      // this.$store.dispatch('actionUpdatePhone');
      // this.$store.dispatch('user/something');

      let res=await this.$networkHandler.sendRequest('LOGIN',{code:this.captcha,phone:this.phone});



      console.log('====res',res);

      let authKey=res.authKey;
      this.$store.commit('UPDATE_AUTH_KEY',authKey);
      this.$router.push('/');
    }


  },
  created () {
    console.log(this.$store);
    console.log('===authKey',this.$store.getters.authKey);
    console.log('===index phone',this.$store.getters.phone);
    console.log('===user phone',this.$store.getters['user/phone']);
  },
  data () {
    return {
      phone:'',
      captcha:'',
      captcha_btn_text:'获取验证码',
      captcha_question:null,//todo 这里需要从后端获取
      question_id:null,
      seconds:10,
      tickSecondInterval:null,
      captcha_disable:false,
    }
  }
}
