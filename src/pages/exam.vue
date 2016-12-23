<template lang="pug">
.content
	.bg
		img(src="../assets/exma_top.png")
	.top_header(flex="main:center cross:center box:mean")
		.top_left(flex-box="3" flex="dir:top main:center cross:center")
			span 考试倒计时
			.time
				.time_bg
					img(src="../assets/countdown_bg.png")
				.time_hour {{min | formatNumber}}
				.time_moment {{sec | formatNumber}}
		.top_right(flex-box="2" flex="main:center cross:center")
			.cricle(flex="dir:top main:center cross:center")
				.cricle_top(flex-box="1" flex="main:center cross:center")
					span {{totalScore}}
				.cricle_center(flex="main:center")
				.cricle_bottom(flex-box="1" flex="main:center cross:center")
					span 分数
	.top_img
		img(src="../assets/titlebg.png")
	.top_title
		span 开始答题
	.content_center(flex="dir:top main:center cross:center")
		div
			span 答题进度:
			span &nbsp;&nbsp;{{currentQuestionId || 1}}
			span &nbsp;/&nbsp;{{this.questions.length}}&nbsp;
	.subject
		div
			span {{ `题目${currentQuestion.index || 1}` }}
		div
			span {{ currentQuestion.title || ''}}
	.answer
		.answer_list(
			v-for="(value, key) in currentQuestion.items"
			v-bind:class="{'answer_list_active':key == selectAnswer}"
			@click="choseAnswer(key)"
			)
			i.iconfont.icon-weibiaoti2(
				v-bind:class="{'icon-yuanquangou':key == selectAnswer}"
				)
			span {{ value }}
	.bottom_group(flex="dir:top")
		div(flex="dir:top main:center cross:center" style="width:100%")
			div(flex-box="1" flex="dir:left" v-show="!hasFinshed" style="width:100%")
				Vbutton(type = "next" @click="doNext")
					span(slot="buttonTitle") 下一题
				Vbutton(type = "skip" @click="doSkip")
					span(slot="buttonTitle") 跳过
			div(flex-box="1" flex="dir:left" v-show="hasFinshed" style="width:100%")
				Vbutton(type = "finished" @click="finished")
					span(slot="buttonTitle") 考试完毕
				Vbutton(type = "rank" @click="showRank")
					span(slot="buttonTitle") 查看排行榜
	.chance
		span {{ skipTimes | formtSkipTime}}
	results(
		v-show="finishedExam"
		v-bind:total-score="totalScore"
		v-bind:answer-sum="answerSum"
		v-bind:user-info="userInfo"
		v-bind:rate-show-modal="rateShowModal"
		v-bind:finished-exam="finishedExam"
		@onPropsChange="change"
		)
	modal(v-show="extShowModal" color="#fa4d8d" @click="doExam(paperId,paperTimelimit)")
		div(slot="head-bg")
			img(src="../assets/titlebg.png" style="width:45%;max-height:50px;")
		span(slot="header") 选择科目
		div(slot="body")
			List(:list="list" \:paperId="paperId" @onPropsChange="change")
		div(slot="footer" flex="dir:left" style="width:100%;")
			Vbutton(:type="`do`" @click="")
				span(slot="buttonTitle") 开始考试
			Vbutton(:type="`back`" @click="closeModal")
				span(slot="buttonTitle") 返回
	modal(v-show="rateShowModal" color="#fdb32b")
		div(slot="head-bg")
			img(src="../assets/titlebg.png" style="width:45%;max-height:50px;")
		span(slot="header") 排行榜
		div(slot="body")
			Vtable
		div(slot="footer" flex="dir:left" style="width:100%;")
			Vbutton(type = "do" @click="doAgain")
				span(slot="buttonTitle") 再考一次
			Vbutton(type = "back" @click="closeModal")
				span(slot="buttonTitle") 返回
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import Modal from '../components/modal.vue'
import Results from '../components/results.vue'
import Vbutton from '../components/button.vue'
import Vtable from '../components/table.vue'
import List from '../components/list.vue'
import * as api from '../store/api'

import _ from 'underscore'

function fetchPaperQuestions(store, wxId, paperId) {
	return store.dispatch('FETCH_QUESTIONS_LIST_DATA', {
		wxId,
		paperId
	})
}

function fetchRankingList(store) {
  return store.dispatch('FETCH_RANKING_LIST_DATA', {
    rankingList: [store.state.rankingList]
  })
}

function fetchUserinfo(store, wxId) {
	return store.dispatch('FETCH_USER_INFO', {
		wxId
	})
}

export default {
	components: {
		Results,
		Vbutton,
		Modal,
		List,
		Vtable
	},
	data() {
		return {
			finishedExam: false,
			hasFinshed: false,
			canChose: true,
			extShowModal: false,
			rateShowModal:false,
			list:[],
			paperListQuestions: [],
			paper:{},
			questions: [],
			answerSum: {
				total:0,
				right:0,
				error:0
			},
			userInfo:{},
			skipTimes: 3,
			min: 0,
			sec: 0,
			timelimit: 0,
			paperTimelimit:0,
			timeOut: false,
			totalScore: 0,
			currentQuestionId: 0,
			currentQuestion: {},
			selectAnswer: '',
			intervalId: null
		}
	},
	methods: {
		choseAnswer(answer) {
			if (this.selectAnswer != answer && this.canChose) {
				this.selectAnswer = answer
			}
		},
		doNext() {
			if (!_.isEmpty(this.selectAnswer)) {
				if (this.currentQuestionId == this.questions.length) {
					// 最后一道题
					this.hasFinshed = true
					this.canChose = false
					window.clearInterval(this.intervalId)
				}
				// 设置答案
				this.paperListQuestions[this.currentQuestionId - 1].result = this.selectAnswer
				// 保存答案
				this.answerSum.total++
				// 判断是否答对
				if (this.selectAnswer == this.currentQuestion.answer) {
					this.answerSum.right++
					this.totalScore += parseInt(100 / this.questions.length)
				}else{
					this.answerSum.error++
				}
				//
				if (this.currentQuestionId != this.questions.length) {
					this.currentQuestion = this.questions[this.currentQuestionId]
					this.currentQuestionId++
					this.selectAnswer = ''
				}
			}
		},
		doSkip() {
			// 设置答案
			if (this.skipTimes > 0) {
				this.answerSum.total++
				this.answerSum.error++

				this.paperListQuestions[this.currentQuestionId - 1].result = this.selectAnswer
				if (this.currentQuestionId != this.questions.length) {
					this.currentQuestion = this.questions[this.currentQuestionId]
					this.currentQuestionId++
				}else{
					// 最后一道题
					this.hasFinshed = true
					this.canChose = false
					window.clearInterval(this.intervalId)
				}
				this.skipTimes--
				this.selectAnswer = ''
			}
		},
		finished() {
			let self = this,
				wxId = self.$route.query.wxId,
				paperId = self.$route.query.paperId

			// 提交答案给服务器
			api.handExam(wxId, paperId,self.paper)
        .then(body => Promise.resolve(body))
        .then(data => {
					if (data.success) {
						self.paper.listPaperQuestions = self.paperListQuestions
						self.rateShowModal = false
						self.finishedExam = true
					}
        })
		},
		doAgain(){
			this.$router.go(0)
		},
		showRank(){
			this.rateShowModal = true
		},
		closeModal(){
			this.extShowModal = false
			this.rateShowModal =false
		},
		change(propName,newVal,oldVal){
			this[propName]=newVal
		},
		loadQestions(){
			let self = this,
				wxId = self.$route.query.wxId,
				paperId = self.$route.query.paperId
			self.$store.dispatch('FETCH_QUESTIONS_LIST_DATA', {wxId, paperId}).then(() => {
				self.paper = self.$store.getters.getQuestionsList
				self.paperListQuestions = self.paper.listPaperQuestions
				self.questions = _.map(self.paperListQuestions, (value, key) => {
						let items = {}
						_.each(value, (v, k) => {
							if (k.indexOf('item') > -1 && !_.isEmpty(v)) {
								items[k.replace('item', '')] = v
							}
						})
						return {
							index: Number(key) + 1,
							title: value.name,
							items,
							answer: value.answer,
							id:value.subjectId
						}
					})
				// 设置首套题目
				self.currentQuestion = self.questions[0]
				self.currentQuestionId = 1
			})
		}
	},
	computed: {
		canNext() {
			return !this.hasFinshed
		},
		canSkip() {
			return this.skipTimes > 0
		},
		...mapGetters([
			'getQuestionsList',
			'getUserinfo'
		])
	},
	mounted() {
		let self = this
		self.timelimit = Number(self.$route.query.timelimit || self.timelimit) * 60 //秒
		self.min = parseInt(Number(self.timelimit) / 60)
		self.sec = self.timelimit % 60
		// 考试定时器
		self.intervalId = setInterval(function() {
			if (self.timelimit > 0) {
				self.timelimit--
					self.min = parseInt(Number(self.timelimit) / 60)
				self.sec = self.timelimit % 60
			} else {
				window.clearInterval(self.intervalId)
				self.timeOut = true
			}
		}, 1000)

		// 获取试题
		this.loadQestions()
	},
	beforeMount() {
		document.title = "开始答题"

		let self = this,
			wxId = self.$route.query.wxId,
			paperId = self.$route.query.paperId

		fetchUserinfo(self.$store, wxId).then(() => {
			self.userInfo = self.$store.getters.getUserinfo
		})
	}
}
</script>

<style lang="stylus" src="../stylus/pages/exam.styl"></style>
