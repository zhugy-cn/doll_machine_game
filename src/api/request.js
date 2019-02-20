import axios from 'axios'
import store from '@/stores'
import { baseURL } from '@/config'

// 打印错误提示
function errorLog(data, config) {
  let errorObj = {
    data,
    url: config.url,
    methods: config.method
  }
  config.params && (errorObj.params = config.params);
  config.data && (errorObj.params = JSON.parse(config.data));
  console.log(errorObj);
}

const ajax = axios.create({
  baseURL,
  timeout: 6000,
})

// GW0000:接口请求成功(所有请求接口成功返回标识, 此接口较特殊不会返回这个标识)
// GW0001:登录成功 
// GW0002:微信授权成功,等待用户注册 
// GW1000:业务异常(相关业务所有异常错误统一返回GW1000, 在message中会具体说明错误原因) 
// GW1001:请求参数错误(例如:code为必传,提交时没有传入。具体错误说明在 message说明) 
// GW1003:权限检查异常,该用户没有操作此接口的权限时返回 
// GW9999:系统异常 系统发生不可预测错误时返回

const reLogin = ['GW1004']
const whiteList = ['GW0000', 'GW0001', 'GW0002', 0];

// 请求 拦截器
ajax.interceptors.request.use(config => {
  let token = store.getters.token;
  if (token) {
    config.headers['token'] = token;
  }
  return config;
}, error => {
  console.log('请求拦截器', error);
});

// 响应 拦截器
ajax.interceptors.response.use(response => {
  const { data } = response
  if (whiteList.includes(data.code)) {
    return data.data;
  } else if (reLogin.includes(data.code)) {
    store.dispatch('logoutAct');
    store.dispatch('setToastAct', '登录过期，请重新登录');
  } else {
    errorLog(data, response.config)
    store.dispatch('setToastAct', data.message)
    return Promise.reject(data)
  }
}, error => {
  let message = error.message
  if (error.response) {
    // 请求已发出，但服务器响应的状态码不在 2xx 范围内
    console.log(error.response.data);
    let msg = error.response.data.message
    if (msg) {
      message = msg;
    }
  } else {
    // 服务器没有响应(超时，断网)
    console.log('Error', message);
  }
  store.dispatch('setToastAct', message)
  return Promise.reject(message)
});
export default ajax;
