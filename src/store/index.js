import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    paperList: [],
    questionsList: [],
    rankingList: []
  },

  actions: {
    FETCH_PAPER_LIST_DATA: ({
      commit,
      dispatch,
      state
    }) => {
      return api.fetchPaperList()
        .then(body => Promise.resolve(body))
        .then(paperlist => {
          commit('SET_PAPER_LIST', {
            paperlist
          })
        })
    },
    FETCH_QUESTIONS_LIST_DATA: ({
      commit,
      dispatch,
      state
    }, {
      wxId,
      paperId
    }) => {
      return api.fetchPaperQuestions(wxId, paperId)
        .then(body => Promise.resolve(body))
        .then(questionsList => {
          commit('SET_QUESTIONS_LIST', {
            questionsList
          })
        })
    },
    FETCH_RANKING_LIST_DATA:({
      commit,
      dispatch,
      state
    }, {
      wxId
    })=>{
      return api.fetchRankingList(wxId)
        .then(body => Promise.resolve(body))
        .then(rankingList => {
          commit('SET_RANKING_LIST', {
            rankingList
          })
        })
    },
    FETCH_USER_INFO: ({
      commit,
      dispatch,
      state
    }, {
      wxId
    }) => {
      return api.fetchUserInfo(wxId)
        .then(body => Promise.resolve(body))
        .then(userInfo => {
          commit('SET_USER_INFO', {
            userInfo
          })
        })
    }
  },

  mutations: {
    SET_PAPER_LIST: (state, {
      paperlist
    }) => {
      state.paperList = paperlist
    },
    SET_QUESTIONS_LIST: (state, {
      questionsList
    }) => {
      state.questionsList = questionsList
    },
    SET_RANKING_LIST: (state, {
      rankingList
    }) => {
      state.rankingList = rankingList
    },
    SET_USER_INFO: (state, {
      userInfo
    }) => {
      state.userInfo = userInfo
    }
  },

  getters: {
    getPaperList(state) {
      return state.paperList
    },
    getQuestionsList(state) {
      return state.questionsList
    },
    getRangkingList(state) {
      return state.rankingList
    },
    getUserinfo(state) {
      return state.userInfo
    }
  }
})

export default store
