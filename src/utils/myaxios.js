import axios from "axios";
import {Loading,Message} from 'element-ui'

const myaxios= axios.create({baseURL:process.env.VUE_APP_BASE_API,timeout:5000});
const loading={
  loadingInstance:null,
  open:function(){
    if(this.loadingInstance===null)
    {    
    this.loadingInstance=Loading.service({
      target:'.main',
      text:'玩命加载中',
      background:'rgba(0,0,0,0.5)'
    });
    }
  },
  close:function(){
    if(this.loadingInstance!==null)
    {
      this.loadingInstance.close()
    }
    this.loadingInstance=null
  }
}

myaxios.interceptors.request.use(function (config) {
  // Do something before request is sent
  loading.open()
  return config;
}, function (error) {
  loading.close()
  // Do something with request error
  return Promise.reject(error);
});

// 响应拦截器
myaxios.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  loading.close()
  const resp=response.data
  if(resp.code!=200)
  {
    Message({
      message:resp.message || '系统异常',
      type:'warning',
      duration:5000,
      showClose:true
    })
  }
  return response;
}, function (error) {
  loading.close()
  console.log(error.response,error.response.status)
  Message({
    message:error.message,
    type:'error',
    duration:5000,
    showClose:true
  })
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

export default myaxios;