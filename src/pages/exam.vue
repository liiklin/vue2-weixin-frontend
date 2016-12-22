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
				Vbutton(type = "rank" @click="rateShowModal = true")
					span(slot="buttonTitle") 查看排行榜
	.chance
		span {{ skipTimes | formtSkipTime}}
	results(v-if="finishedExam" @close="finishedExam = false")
	modal(v-if="rateShowModal" color="#fdb32b")
		div(slot="head-bg")
			img(src="../assets/titlebg.png" style="width:45%;max-height:50px;")
		span(slot="header") 排行榜
		div(slot="body")
			Vtable
		div(slot="footer" flex="dir:left" style="width:100%;")
			Vbutton(type = "do" @click="doExam(paperId,timelimit)")
				span(slot="buttonTitle") 再考一次
			Vbutton(type = "back" @click="rateShowModal = false")
				span(slot="buttonTitle") 返回
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import Modal from '../components/modal.vue'
import Results from '../components/results.vue'
import Vbutton from '../components/button.vue'
import Vtable from '../components/table.vue'

import _ from 'underscore'

function fetchPaperQuestions(store, wxId, paperId) {
	return store.dispatch('FETCH_QUESTIONS_LIST_DATA', {
		wxId,
		paperId
	})
}

function fetchAnsers(store) {

}

export default {
	components: {
		Results,
		Vbutton,
		Modal,
		Vtable
	},
	data() {
		return {
			finishedExam: false,
			hasFinshed: false,
			canChose: true,
			rateShowModal:false,
			paperListQuestions: [],
			paper:{},
			questions: [],
			answerList: [],
			skipTimes: 3,
			min: 0,
			sec: 0,
			timelimit: 0,
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
				}
				// 设置答案
				this.paperListQuestions[this.currentQuestionId - 1].result = this.selectAnswer
				// 判断是否答对
				if (this.selectAnswer == this.currentQuestion.answer) {
					this.totalScore += parseInt(100 / this.questions.length)
				}
				//
				if (this.currentQuestionId != this.questions.length) {
					this.currentQuestion = this.questions[this.currentQuestionId]
					this.currentQuestionId++
					this.selectAnswer = ''
					window.clearInterval(this.intervalId)
				}
			}
		},
		doSkip() {
			// 设置答案
			if (this.skipTimes > 0) {
				this.paperListQuestions[this.currentQuestionId - 1].result = this.selectAnswer
				if (this.currentQuestionId != this.questions.length) {
					this.currentQuestion = this.questions[this.currentQuestionId]
					this.currentQuestionId++
					this.skipTimes--
					this.selectAnswer = ''
				}else{
					// 最后一道题
					this.hasFinshed = true
					this.canChose = false
				}
			}
		},
		finished() {
			this.paper.listPaperQuestions = this.paperListQuestions
			this.finishedExam = true
		},
	},
	computed: {
		canNext() {
			return !this.hasFinshed
		},
		canSkip() {
			return this.skipTimes > 0
		}
	},
	mounted() {
		let seft = this
		seft.timelimit = Number(seft.$route.query.timelimit || seft.timelimit) * 60 //秒
		seft.min = parseInt(Number(seft.timelimit) / 60)
		seft.sec = seft.timelimit % 60
		// 考试定时器
		seft.intervalId = setInterval(function() {
			if (seft.timelimit > 0) {
				seft.timelimit--
					seft.min = parseInt(Number(seft.timelimit) / 60)
				seft.sec = seft.timelimit % 60
			} else {
				window.clearInterval(seft.intervalId)
				seft.timeOut = true
			}
		}, 1000)
	},
	beforeMount() {
		document.title = "开始答题"

		let seft = this
		let wxId = seft.$route.query.wxId,
			paperId = seft.$route.query.paperId

		// 获取试题
		fetchPaperQuestions(seft.$store, wxId, paperId).then(() => {
			seft.paper = seft.$store.getters.getQuestionsList
			seft.paperListQuestions = seft.paper.listPaperQuestions
			seft.questions = _.map(seft.paperListQuestions, (value, key) => {
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
			seft.currentQuestion = seft.questions[0]
			seft.currentQuestionId = 1
		})
	}
}
</script>

<style lang="stylus" src="../stylus/pages/exam.styl"></style>
