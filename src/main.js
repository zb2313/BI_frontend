import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import VueRouter from "vue-router";
import ElementUI from "element-ui";
import 'element-ui/lib/theme-chalk/index.css';//注意这句必须要有，否则element-ui没弔用
import router from "@/router";
import * as echarts from 'echarts';
Vue.config.productionTip = false
Vue.prototype.$axios=axios;
Vue.prototype.$echarts = echarts
Vue.use(VueRouter)
Vue.use(ElementUI)
new Vue({
  router,//对应route.fullPath
  render: h => h(App),
}).$mount('#app')
