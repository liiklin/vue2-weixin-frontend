import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    paperList: [],
    questionsList: [],
    chosePaperId: null
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
    },{
      wxId,
      paperId
    }) => {
      return api.fetchPaperQuestions(wxId,paperId)
        .then(body => Promise.resolve(body))
        .then(questionsList => {
          commit('SET_QUESTIONS_LIST', {
            questionsList
          })
        })
    },
    FETCH_USER_INFO: (commit, dispatch, state) => {
      return api.fetchUserInfo()
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
    SET_CHOSE_PAPER: (state, {
      chosePaperId
    }) => {
      state.chosePaperId = chosePaperId
    },
    SET_USER_INFO: (state, {
      uerInfo
    }) => {
      state.uerInfo = uerInfo
    }
  },

  getters: {
    getPaperList(state) {
      return state.paperList
    },
    getQuestionsList(state) {
      return state.questionsList
    },
    activeChosePaper(state) {
      return state.chosePaperId
    },
    getUserInfo(state) {
      return state.userInfo
    }
  }
})

export default store
