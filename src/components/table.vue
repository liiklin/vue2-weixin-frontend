<template lang="pug">

table
	tr
		th(v-for="title in titles")
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
    data() {
        return {
            titles: ['排行', '名称', '分数'],
            listDatas: [{
                index: 1,
                name: '林军1',
                score: 100
            }, {
                index: 2,
                name: '林军2',
                score: 99
            }, {
                index: 3,
                name: '林军3',
                score: 98
            }, {
                index: 4,
                name: '林军4',
                score: 96
            }, {
                index: 5,
                name: '林军5',
                score: 95
            }, {
                index: 5,
                name: '林军5',
                score: 95
            }, {
                index: 5,
                name: '林军5',
                score: 95
            }, {
                index: 5,
                name: '林军5',
                score: 95
            }, {
                index: 5,
                name: '林军5',
                score: 95
            }]
        }
    }
}
</script>

<style scoped lang="stylus" src="../stylus/components/table.styl"></style>
