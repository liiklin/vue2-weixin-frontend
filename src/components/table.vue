<template lang="pug">

table
	tr
		th(v-for="title in titlesDatas")
			| {{ title }}
	tr(v-for="data in listDatas")
		td
			| {{ data.index }}
		td
			| {{ data.name }}
		td
			| {{ data.score }}
</template>

<script>
export default {
    name: 'Vtable',
		props:{
			list:{
				// type:Array,
				// default:[]
			},
			titles:{
				// type:Array,
				// default:['排行', '名称', '分数']
			}
		},
    data() {
        return {
            titlesDatas: this.titles,
            listDatas: this.list
        }
    }
}
</script>

<style scoped lang="stylus" src="../stylus/components/table.styl"></style>
