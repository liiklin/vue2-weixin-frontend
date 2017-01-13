import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'underscore'
import {
  API_ROOT
} from './config'

Vue.use(Vuex)

function creatLog(userId) {
  return encodeURIComponent(JSON.stringify({
    begTime: new Date().getTime(),
    app: "weixin",
    userId
  }))
}

function fetch(child) {
  return new Promise((resolve, reject) => {
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

export function fetchPaperList(wxId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/getPaperList?_log=${_log}`).then((response) => {
    let paperList = _.map(response.data, (value, key) => {
      return {
        index: key,
        id: value.id,
        title: value.name,
        timelimit: value.timelimit
      }
    })
    return paperList
  })
}

export function fetchPaperQuestions(wxId, paperId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/getPaperQuestions?wxId=${wxId}&paperId=${paperId}&_log=${_log}`, wxId).then((response) => {
    return response.data
  })
}

export function fetchUserInfo(wxId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/getUserinfo?wxId=${wxId}&_log=${_log}`, wxId).then(response => {
    return response.data
  })
}

export function fetchRankingList(paperId, wxId) {
  let _log = creatLog(wxId)
  return fetch(`WxBus/getExamRankingList?paperId=${paperId}&_log=${_log}`, wxId).then(response => {
    let items = _.map(response.data, (value, key) => {
      return {
        index: Number(key) + 1,
        scored: Number(value.scored),
        name: value.userName
      }
    })
    return items
  })
}

export function handExam(wxId, paperId, data) {
  let listPaperQuestions = encodeURIComponent(typeof data == 'string' ? data : JSON.stringify(data)),
    postData = {
      wxId,
      paperId,
      listPaperQuestions,
      _log: creatLog(wxId)
    }
  return post(`WxBus/handExam`, postData, wxId).then(response => {
    return response
  })
}
