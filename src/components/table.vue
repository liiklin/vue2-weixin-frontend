<template lang="pug">

table
	tr
		th(v-for="title in titles")
			| {{ title }}
	tr(v-for="data in listDatas")
		td(style="width:1.5625rem;") {{ data.index }}
		td {{ data.name }}
		td(style="width:1.5625rem;") {{ data.scored }}
</template>

<script>
export default {
    name: 'Vtable',
		props:{
			listDatas:{
				type:Array
			},
			titles:{
				type:Array,
				default:['排行', '名称', '分数']
			}
		}
}

</script>

<style scoped lang="stylus" src="../stylus/components/table.styl"></style>
