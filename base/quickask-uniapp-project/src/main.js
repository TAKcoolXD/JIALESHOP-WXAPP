import Vue from 'vue'
import App from './App'
import './uni.promisify.adaptor'

Vue.config.productionTip = false

App.mpType = 'app'

//引入uview-ui
import uView from "uview-ui"
Vue.use(uView)

const app = new Vue({
  ...App
})

// 引入请求封装，将app参数传递到配置中
require('./services/request.js')(app)

app.$mount()
