import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'

Vue.config.productionTip = false

App.mpType = 'app'



// 引入ui框架
import uView from "uview-ui";
Vue.use(uView)

const app = new Vue({
  ...App
})

//引入请求的封装
require('./services/request')(app)

app.$mount()
