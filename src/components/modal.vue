<template lang="pug">
transition(name="modal")
	.modal-mask
		.modal-wrapper
			.modal-container(:style="styleObject")
				.modal-header
					.modal-header-bg
						div
							slot(name="head-bg")
					.modal-header-title
						span
							slot(name="header")
								| &nbsp;
				.modal-body(:style="styleObject1")
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
		},
		height:{
			type: String,
		},
		bodyHeight:{
			type: String,
		}
	},
	data() {
		return {
			styleObject: {
				"border-color": this.color,
				"height":this.height
			},
			styleObject1: {
				"height":this.bodyHeight
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
