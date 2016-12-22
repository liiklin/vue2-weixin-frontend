<template lang="pug">
transition(name="modal")
	.modal-mask
		.modal-wrapper
			.modal-container(flex="dir:top main:center cross:center")
				.modal-header(flex-box="1" flex="dir:top main:center cross:center box:last")
					div(flex-box="6" flex="main:center cross:center box:last" style="height:100%;")
						.header-bg-top
							img(src="http://wx.qlogo.cn/mmopen/D9auvJbDV7eMu4NNibU4o3DPlVI9wZnt1cGr5FGFho6tHY1OYBQ7q5hOR0gyLibKRZdq41DiaPynr5VsuJS2hO32v68yu5fmmSK/0")
						.header-bg-bottom
					.modal-header-center(flex-box="5" flex="dir:left main:center cross:center")
						.modal-header-center-score(flex-box="2" flex="dir:top main:center cross:center")
							.modal-header-center-score-cricle(flex="dir:top main:center cross:center")
								.modal-header-center-score-cricle-top(flex-box="1" flex="main:center cross:center")
									span
										| 80
								.modal-header-center-score-cricle-center(flex="main:center")
								.modal-header-center-score-cricle-bottom(flex-box="1" flex="main:center cross:center")
									span
										| 分数
						.modal-header-center-answer(flex="dir:left main:center cross:center")
							.modal-header-center-answer-info
								.modal-header-center-answer-bg
									img(src="../assets/fraction_bg.png")
								.modal-header-center-answer-info-top
									span(style="color:#6f9eff") 50
								div
									span 答题
							.modal-header-center-answer-info
								.modal-header-center-answer-bg
									img(src="../assets/fraction_bg.png")
								.modal-header-center-answer-info-top
									span(style="color:#25d848") 38
								div
									span 答对
							.modal-header-center-answer-info
								.modal-header-center-answer-bg
									img(src="../assets/fraction_bg.png")
								.modal-header-center-answer-info-top
									span(style="color:#ff4d4d") 7
								div
									span 答错
					.modal-header-bottom(flex-box="1")
				div(flex-box="1" flex="dir:top main:center cross:center" style="background:#fff;width:100%;height:auto")
					.modal-body(flex-box="1" flex="main:center cross:center")
						slot(name="body")
							div(flex="dir:top main:center cross:center")
								div(flex-box="1" style="font-size:1.2em;color:#233b92;padding: 5% 0px;")
									span USER 荣获“学霸”牛逼称号
								div(flex-box="1" style="font-size:0.75em;color:#a1a1a1")
									span 获得抽奖机会还差 100积分
					.modal-footer(flex-box="9" flex="main:center")
						slot(name="footer")
							.footer(flex="dir:top main:center cross:center box:mean")
								.footer-center(flex-box="1" flex="dir:left main:center cross:center")
									Vbutton(v-bind:type = "`do`" @click="")
										span(slot="buttonTitle") 再来一次
									Vbutton(v-bind:type = "`back`" @click="")
										span(slot="buttonTitle") 查看排行榜
								.footer-bottom(flex-box="1" style="width:90%;")
									Vbutton(v-bind:type = "`finished`" @click="")
										span(slot="buttonTitle") 分享赚积分
</template>

<script>
import Vbutton from '../components/button.vue'

export default {
    name: "results",
		components: {
			Vbutton
		},
    data() {
        return {
        }
    }
}
</script>

<style media="screen" scoped lang="stylus" src="../stylus/components/results.styl">

</style>
