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
  return fetch(`WxBus/getPaperQuestions?wxId=${wxId}&paperId=${paperId}`).then((response) => {
    return response.data
  })
}

export function fetchUserInfo(wxId) {
  return fetch(`WxBus/getUserinfo?wxId=${wxId}`).then(response => {
    return response.data.user
  })
}

export function fetchRankingList(paperId) {
  return fetch(`WxBus/getExamRankingList?paperId=${paperId}`).then(response => {
    let items = _.map(response.data,(value,key)=>{
      console.log(Number(value.scored))
      return {
        index:Number(key)+1,
        scored:Number(value.scored),
        name:value.userName
      }
    })
    console.log(items)
    return items
  })
}

export function handExam(wxId, paperId, data) {
  let listPaperQuestions = encodeURIComponent(typeof data == 'string' ? data : JSON.stringify(data)),
    _log = encodeURIComponent(JSON.stringify({
      begTime: new Date().getTime(),
      app: "weixin",
      userId: wxId
    })),
    postData = {
      wxId,
      paperId,
      listPaperQuestions,
      _log
    }
  return post(`WxBus/handExam`, postData).then(response => {
    return response
  })
}
