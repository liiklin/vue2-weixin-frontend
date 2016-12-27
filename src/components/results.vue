<template lang="pug">
transition(name="modal")
	.modal-mask
		.modal-wrapper
			.modal-container(flex="dir:top main:center cross:center")
				.modal-header(flex-box="1" flex="dir:top main:center cross:center box:last")
					div(flex="dir:top main:center cross:center")
						.header-bg-userIcon-top
								.header-bg-top
									img(:src="userInfo.wxPhoto")
						.header-bg-userIcon-bottom
								.header-bg-bottom
					.modal-header-center(flex-box="5" flex="dir:left main:center cross:center")
						.modal-header-center-score(flex-box="2" flex="dir:top main:center cross:center")
							.modal-header-center-score-cricle(flex="dir:top main:center cross:center")
								.modal-header-center-score-cricle-top(flex-box="1" flex="main:center cross:center")
									span(v-text="totalScore")
								.modal-header-center-score-cricle-center(flex="main:center")
								.modal-header-center-score-cricle-bottom(flex-box="1" flex="main:center cross:center")
									span 分数
						.modal-header-center-answer(flex="dir:left main:center cross:center")
							.modal-header-center-answer-info
								.modal-header-center-answer-bg
									img(src="../assets/fraction_bg.png")
								.modal-header-center-answer-info-top
									span(style="color:#6f9eff" v-text="answerSum.total")
								div
									span 答题
							.modal-header-center-answer-info
								.modal-header-center-answer-bg
									img(src="../assets/fraction_bg.png")
								.modal-header-center-answer-info-top
									span(style="color:#25d848" v-text="answerSum.right")
								div
									span 答对
							.modal-header-center-answer-info
								.modal-header-center-answer-bg
									img(src="../assets/fraction_bg.png")
								.modal-header-center-answer-info-top
									span(style="color:#ff4d4d" v-text="answerSum.error")
								div
									span 答错
					.modal-header-bottom(flex-box="1")
				div(flex-box="1" flex="dir:top main:center cross:center" style="background:#fff;width:100%;height:auto")
					.modal-body(flex-box="1" flex="main:center cross:center")
						slot(name="body")
							.honor(flex="dir:top main:center cross:center")
								.honor-top(flex-box="1")
									span {{userInfo.name}} 荣获“学霸”牛逼称号
								.honor-bottom(flex-box="1")
									span 获得抽奖机会还差100积分
					.modal-footer(flex-box="9" flex="main:center")
						slot(name="footer")
							.footer(flex="dir:top main:center cross:center box:mean")
								.footer-center(flex-box="1" flex="dir:left main:center cross:center")
									Vbutton(v-bind:type = "`do`" @click="doAgain")
										span(slot="buttonTitle") 再来一次
									Vbutton(v-bind:type = "`back`" @click="showRank")
										span(slot="buttonTitle") 查看排行榜
								.footer-bottom(flex-box="1")
									Vbutton(v-bind:type = "`finished`" @click="")
										span(slot="buttonTitle") 分享赚积分
</template>

<script>
import Vbutton from '../components/button.vue'

import propsync from '../mixins/propsync' //引入mixin文件

export default {
	name: "results",
	mixins: [propsync],//声明使用propsync的mixin
	components: {
		Vbutton
	},
	props: {
		totalScore: {
			type: Number,
			propsync: false,
			default: 0
		},
		answerSum: {
			type: Object,
			propsync: false
		},
		userInfo: {
			type: Object,
			propsync: false
		},
		rateShowModal: {
			type:Boolean
		},
		finishedExam: {
			type:Boolean
		}
	},
	data() {
		return {}
	},
	methods:{
		doAgain(){
			location.reload()
		},
		showRank(){
			this.p_rateShowModal = false
			this.p_finishedExam = false
			this.p_rateShowModal = true
		}
	}
}
</script>

<style media="screen" scoped lang="stylus" src="../stylus/components/results.styl"></style>
