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
    meta:{
      title: '我的考试'
    },
    component: Home
  }, {
    name: 'index',
    path: '/index',
    meta:{
      title: '我的考试'
    },
    component: Home
  }, {
    name: 'exam',
    path: '/exam',
    meta:{
      title: '开始考试'
    },
    component: Exam
  }, ]
})
