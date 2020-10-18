import Vue from 'vue'
import axios from 'axios'
import config from './config'

axios.defaults.baseURL = config.api; // 设置axios的基础请求路径
axios.defaults.timeout = 2000; // 设置axios的请求时间

// axios.interceptors.request.use(function (config) {
//   // console.log(config);
//   return config;
// })

axios.loadData = async function (url) {
  const resp = await axios.get(url);
  return resp.data;
}

Vue.prototype.$http = axios;// 将axios添加到 Vue的原型，这样一切vue实例都可以使用该对象
//Vue.prototype是获取Vue原型， 如果想对已有的对象扩展属性或者方法需要先做
//上面意思为扩展一个属性较$http，它的值为axios，这里的axios又是导入的
//封装的原因是为了方便，即不用每次使用都要先导入axios
