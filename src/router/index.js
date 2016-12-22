import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Home from '../pages/index.vue'
import Exam from '../pages/exam.vue'

export default new Router({
  // mode: 'history',
  scrollBehavior: () => ({
    y: 0
  }),
  routes: [{
    name: 'home',
    path: '/',
    component: Home
  }, {
    name: 'index',
    path: '/index',
    component: Home
  }, {
    name: 'exam',
    path: '/exam',
    component: Exam
  }, ]
})
