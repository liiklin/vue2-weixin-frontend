import Vue from 'vue'
import Vuex from 'vuex'
// import request from 'superagent'
import _ from 'underscore'
import {
  API_ROOT
} from './config'

Vue.use(Vuex)

function fetch(child) {
  return new Promise((resolve, reject) => {
    // console.log(child)
    Vue.http.get(API_ROOT + child).then((response) => {
      if (typeof response.body == 'string') {
        resolve(JSON.parse(response.body))
      } else {
        resolve(response.body)
      }
    }, reject)
  })
}

function post(child, data) {
  return new Promise((resolve, reject) => {
    Vue.http.post(API_ROOT + child, data, {
        emulateJSON: true
      })
      .then((response) => {
        if (typeof response.body == 'string') {
          resolve(JSON.parse(response.body))
        } else {
          resolve(response.body)
        }
      }, reject)
  })
}

export function fetchPaperList() {
  return fetch('WxBus/getPaperList').then((response) => {
    // console.log(response.data)
    let paperList = _.map(response.data, (value, key) => {
        return {
          index: key,
          id: value.id,
          title: value.name,
          timelimit: value.timelimit
        }
      })
      // console.log(paperList)
    return paperList
  })
}

export function fetchPaperQuestions(wxId, paperId) {
  return fetch(`WxBus/getPaperQuestions?wxId=${wxId}&paperId=${paperId}`).then((response) => {
    return response.data
  })
}

export function fetchUserInfo(wxId) {
  return fetch(`WxBus/getUserinfo?wxId=${wxId}`).then(response => {
    return response.data.user
  })
}

export function handExam(wxId, paperId, data) {
  let listPaperQuestions = encodeURIComponent(typeof data == 'string' ? data : JSON.stringify(data)),
    _log = encodeURIComponent(JSON.stringify({
      begTime: new Date().getTime(),
      app: "weixin",
      userId: wxId
    }))
  posdData = {
    wxId,
    paperId,
    listPaperQuestions,
    _log
  }
  return post(`WxBus/handExam`, posdData).then(response => {
    return response
  })
}
