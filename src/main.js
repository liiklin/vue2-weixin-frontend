import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import {sync} from 'vuex-router-sync'
import * as filter from './filter' //自定义过滤器

import 'vue2-animate/dist/vue2-animate.min.css' // animate
import 'normalize.css' //重置浏览器默认样式
import 'flex.css' //flex布局
import './iconfont/iconfont.css' //web字体图标

sync(store, router)

Object.keys(filter).forEach(k => Vue.filter(k, filter[k])) //注册过滤器

const app = new Vue({
  router,
  store,
  el: '#app',
  render: h => h(App)
})
