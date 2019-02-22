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
  timeout: 10000,
})


const whiteList = [0, 8888];

// 请求 拦截器
ajax.interceptors.request.use(config => {
  const token = store.state.token;
  // if (token) {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  // config.headers["Authorization"] = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.Im92RHo3NV9KMEkzRUgwR3JLYnRFS0s4eHllWmci.9IDSlI6VBRQqQDZSOc8BHKRd199k-Ep3dz2EswWNYOU';
  // }
  return config;
}, error => {
  console.log('请求拦截器', error);
});

// 响应 拦截器
ajax.interceptors.response.use(response => {
  const { data } = response
  if (whiteList.includes(data.code)) {
    return data.data;
  } else {
    // errorLog(data, response.config)
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
