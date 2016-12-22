import Vue from 'vue'
import Vuex from 'vuex'
import request from 'superagent'
import _ from 'underscore'
import {
  API_ROOT
} from './config'

Vue.use(Vuex)

function fetch(child) {
  return new Promise((resolve, reject) => {
    request.get(API_ROOT + child).then((response) => {
      if (typeof response.text == 'string') {
        resolve(JSON.parse(response.text))
      } else {
        resolve(response.text)
      }
    }, reject)
  })
}

function post(child,data){
  return new Promise((resolve, reject) => {
    request.post(API_ROOT + child)
    .set('Content-Type', 'application/json')
    .send(data)
    .then((response) => {
      if (typeof response.text == 'string') {
        resolve(JSON.parse(response.text))
      } else {
        resolve(response.text)
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
  return fetch(`WxBus/getUserInfo?wxId=${wxID}`).then(response => {
    return response.user
  })
}

export function postAnswer(wxId,paperId,data){
  let listPaperQuestions = typeof data == 'string' ? data : JSON.stringify(data)
  return post(`WxBus/getUserInfo?wxId=${wxID}&paperId=${paperId}&listPaperQuestions=${listPaperQuestions}`)
}
