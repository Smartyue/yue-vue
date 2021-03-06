/**
 * Created by yuanjianxin on 2018/3/16.
 */
const networkMaps=new Map();
const axios=require('axios');
const qs=require('qs');
class NetworkHandler{

  constructor(config){

    this._beforeHttpFunc=config._beforeHttpFunc;
    this._afterHttpFunc=config._afterHttpFunc;
    this.timeout = config.timeout || 5000;

    delete config._beforeHttpFunc;
    delete config._afterHttpFunc;
    delete config.timeout;

    config&&Object.keys(config).forEach(k=>networkMaps.set(k,config[k]));
  }

  async sendRequest(key,para,headers={}){
    if(!key || !networkMaps.has(key)){
      console.error('no such network key :'+key);
      return undefined;
    }

    let reqConfig=networkMaps.get(key);

    let beforeConf=this._beforeHttpFunc(para,headers);
    para=beforeConf.para;
    headers=beforeConf.headers;

    let method=reqConfig.method.toLowerCase();
    let url=reqConfig.url;

    let config = {method, url, headers, timeout: this.timeout};
    method=='get' && (config.params=para);
    ['post','put','patch'].includes(method) && (config.data=para);

    let content_type=headers['Content-Type'] && headers['Content-Type'].split(';')[0] || null;
    content_type==='application/x-www-form-urlencoded' && (config.transformRequest=[function (data) {
      return qs.stringify(data);
    }]);

    let res= new Promise((resolve,reject)=>{
      axios(config).then(res=>{
        res=res && res.data || res;
        console.log('===HttpUtil Resolve===',res);
        resolve(res);
      }).catch(err=>{
        err=err.response && err.response.data || err;
        console.log('===HttpUtil Reject===',err,err.errors);
        reject(err);
      });
    });

    try{
      res=await res;
    }catch (e){
      console.error('====Network Error', e);
      res={
        code:'error',
        error:e
      }
    }

    return this._afterHttpFunc(res);

  }


}


export default {
  install:(Vue,options)=>{
    Vue.prototype.$networkHandler=new NetworkHandler(options);
  }
}
