import Vue from 'vue'
import Vuex from 'vuex'
import * as api from './api'

import _ from 'underscore'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    userInfo: {},
    paperList: [],
    questionsList: [],
    homeRankingList: [],
    rankingList: []
  },

  actions: {
    FETCH_PAPER_LIST_DATA: ({
      commit,
      dispatch,
      state
    }, {
      wxId
    }) => {
      return api.fetchPaperList(wxId)
        .then(body => Promise.resolve(body))
        .then(paperlist => {
          // console.log(paperlist)
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
          // console.log(questionsList)
          commit('SET_QUESTIONS_LIST', {
            questionsList
          })
        })
    },
    FETCH_RANKING_LIST_DATA: ({
      commit,
      dispatch,
      state
    }, {
      paperId,
      wxId
    }) => {
      return api.fetchRankingList(paperId, wxId)
        .then(body => Promise.resolve(body))
        .then(rankingList => {
          // console.log(rankingList)
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
        .then(data => {
          let userInfo = data.user,
            homeRankingList = data.scoreRankingList
          commit('SET_USER_INFO', {
            userInfo
          })

          // commit('SET_HOME_RANKING_LIST', {
          //   homeRankingList
          // })
          dispatch('FETCH_HOME_RANKING_LIST', {
            list: homeRankingList
          })
        })
    },
    FETCH_HOME_RANKING_LIST: ({
      commit,
      dispatch,
      state
    }, {
      list
    }) => {
      let homeRankingList = _.map(list, (value, key) => {
        return {
          index: key + 1,
          name: value.userName,
          scored: value.score
        }
      })
      commit('SET_HOME_RANKING_LIST', {
        homeRankingList
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
    },
    SET_HOME_RANKING_LIST: (state, {
      homeRankingList
    }) => {
      state.homeRankingList = homeRankingList
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
    },
    getHomeRankingList(state) {
      return state.homeRankingList
    }
  }
})

export default store
