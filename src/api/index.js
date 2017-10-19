/**
 * Created by wang on 2017/5/25.
 */
import axios from 'axios'
import qs from 'qs'

// 使用代理
const HOST = '/api/';

// 全局 axios 默认配置
const instance = axios.create({
  baseURL: "https://cnodejs.org/api/v1", //配置接口地址
  timeout: 5000,                                            //响应时间
  headers: {'content-Type': 'application/x-www-form-urlencoded'}
});

//POST传参序列化(添加请求拦截器)
instance.interceptors.request.use((config) => {
  //在发送请求之前做某件事
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  console.log(error)
  return Promise.reject(error);
});

// respone拦截器
instance.interceptors.response.use(
  //在这里对返回的数据进行处理
  response => response.data,
  error => {
    return Promise.reject(error)
  })

export default instance;


