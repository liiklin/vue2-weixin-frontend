<template lang="pug">
div
	.list(
		v-for="data in listDatas"
		@click="chosePaper(data.id,data.timelimit)"
		v-bind:class="{'active-list':data.id == selectPaper}"
		)
		span
			| {{data.title}}
		i(class="iconfont icon-xuanze")
</template>

<script>
import propsync from '../mixins/propsync' //引入mixin文件

export default {
    name: "list",
    mixins: [propsync],//声明使用propsync的mixin
    props: {
        "list": {
            type: [Array],
            propsync: false
        },
        "paperId": {
            type: [String, Number]
        },
				"timelimit":{
					type:[String, Number]
				}
    },
    data() {
        return {
            listDatas: this.list,
            selectPaper: null
        }
    },
    methods: {
        chosePaper(id,timelimit) {
            if (id != this.selectPaper) {
                this.selectPaper = id
                this.p_paperId = id
								this.p_timelimit = timelimit
            }
        }
    }
}
</script>

<style scoped lang="stylus" src="../stylus/components/list.styl"></style>
