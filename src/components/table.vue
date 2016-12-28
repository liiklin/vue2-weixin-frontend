<template lang="pug">

table
	tr
		th(v-for="title in titlesDatas")
			| {{ title }}
	tr(v-for="data in listDatas")
		td {{ data.index }}
		td {{ data.name }}
		td {{ data.scored }}
</template>

<script>
export default {
    name: 'Vtable',
		props:{
			listDatas:{
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
            list: this.listDatas
        }
    }
}

// [{
// 		index: 1,
// 		name: '林军1',
// 		score: 100
// }, {
// 		index: 2,
// 		name: '林军2',
// 		score: 99
// }, {
// 		index: 3,
// 		name: '林军3',
// 		score: 98
// }, {
// 		index: 4,
// 		name: '林军4',
// 		score: 96
// }, {
// 		index: 5,
// 		name: '林军5',
// 		score: 95
// }, {
// 		index: 6,
// 		name: '林军5',
// 		score: 95
// }, {
// 		index: 7,
// 		name: '林军5',
// 		score: 95
// }, {
// 		index: 8,
// 		name: '林军5',
// 		score: 95
// }, {
// 		index: 9,
// 		name: '林军5',
// 		score: 95
// }]

</script>

<style scoped lang="stylus" src="../stylus/components/table.styl"></style>
