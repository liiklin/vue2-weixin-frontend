<template lang="pug">
transition(name="modal")
	.modal-mask
		.modal-wrapper
			.modal-container(:style="styleObject")
				.modal-header
					.modal-header-bg
						slot(name="head-bg")
					.modal-header-title
						span
							slot(name="header")
								| 选择科目
				.modal-body
					slot(name="body")
						| &nbsp;
				.modal-footer(flex="main:center cross:center")
					slot(name="footer")
						| &nbsp;
</template>

<script>
export default {
	name: "modal",
	props: {
		color: {
			type: String,
		}
	},
	data() {
		return {
			styleObject: {
				"border-color": this.color
			}
		}
	},
	methods: {
		handleClick(evt) {
			this.$emit('click', evt)
		}
	}
}
</script>

<style scoped lang="stylus" src="../stylus/components/modal.styl"></style>
