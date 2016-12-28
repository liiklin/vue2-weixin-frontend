<template lang="pug">
div
  div(class="bg")
    img(src="../assets/bg2.png")
  .content(flex="dir:top main:center")
    div(flex="main:center cross:center")
      Vbutton(:type="`start`" @click="extShowModal = true")
        span(slot="buttonTitle") 开始考试
      Vbutton(:type="`rank-index`" @click="rateShowModal = true")
        span(slot="buttonTitle") 答题排行榜
    .activity-info
      div(@click="infoShowModal = true")
        i(class="iconfont icon-xinxi")
        span 查看活动介绍
  modal(v-if="extShowModal" color="#fa4d8d" height="8.28125rem" body-height="4.6rem")
    img(slot="head-bg" src="../assets/titlebg.png")
    span(slot="header") 选择科目
    div(slot="body")
      List(:list="list" \:paperId="paperId" @onPropsChange="change")
    div(slot="footer" flex="dir:left main:center cross:center" style="width:100%;")
      Vbutton(:type="`do`" @click="doExam(paperId,timelimit)")
        span(slot="buttonTitle") 开始考试
      Vbutton(:type="`back`" @click="extShowModal = false")
        span(slot="buttonTitle") 返回
  modal(v-show="rateShowModal" color="#ffb400" height="11.5625rem")
    img(slot="head-bg" src="../assets/titlebg.png")
    span(slot="header") 排行榜
    div(slot="body")
      Vtable(\:list="rankingList" \:titles="titles")
    div(slot="footer" flex="dir:left main:center cross:center" style="width:100%;")
      Vbutton(:type="`do`" @click="start")
        span(slot="buttonTitle") 开始考试
      Vbutton(:type="`back`" @click="rateShowModal = false")
        span(slot="buttonTitle") 返回
  modal(v-show="infoShowModal" color="#69a2fc" height="8.28125rem" body-height="4.6rem")
    img(slot="head-bg" src="../assets/titlebg2.png")
    span(slot="header") 活动介绍
    div(slot="body")
      span 活动介绍。
    div(slot="footer" flex="dir:left main:center cross:center" style="width:100%;")
      Vbutton(:type="`do`" @click="start")
        span(slot="buttonTitle") 开始考试
      Vbutton(:type="`back`" @click="infoShowModal = false")
        span(slot="buttonTitle") 返回
</template>

<script>
import {mapGetters, mapActions} from 'vuex'

import Modal from '../components/modal.vue'
import List from '../components/list.vue'
import Vtable from '../components/table.vue'
import Vbutton from '../components/button.vue'

function fetchPaperList(store){
  return store.dispatch('FETCH_PAPER_LIST_DATA', {
    paperList: [store.state.paperList]
  })
}

function fetchUserinfo(store, wxId) {
	return store.dispatch('FETCH_USER_INFO', {
		wxId
	})
}

export default {
    components: {
        Modal,
        List,
        Vtable,
        Vbutton
    },
    data() {
        return {
          extShowModal:false,
          rateShowModal:false,
          infoShowModal:false,
          titles: ['排行', '名称', '分数'],
          rankingList:[],
          list:[],
          paperId:'',
          timelimit:0
        }
    },
    methods:{
      change(propName,newVal,oldVal){
        this[propName]=newVal
      },
      start(){
        this.extShowModal = false
        this.infoShowModal = false
        this.rateShowModal = false
        this.extShowModal = true
      },
      doExam(paperId,timelimit){
        let wxId = this.$route.query.id
        if (!paperId) {
          alert('请选择考卷!')
          return false
        }
        this.$router.push({ name: 'exam',query:{wxId,paperId,timelimit}})
      }
    },
    computed: {
      ...mapGetters([
        'getPaperList'
      ])
    },
    mounted() {
      // 获取用户信息
      let wxId = this.$route.query.id
      fetchUserinfo(this.$store, wxId)
    },
    beforeMount (){
      let self = this,
        wxId = self.$route.query.id,
        paperId = self.$route.query.paperId

      fetchPaperList(self.$store).then(()=>{
        self.list = self.$store.getters.getPaperList
      })

      // fetchUserinfo(self.$store, wxId).then(() => {
      //   self.userInfo = self.$store.getters.getUserinfo
      // })
    }
}
</script>

<style scoped lang="stylus" src="../stylus/pages/index.styl"></style>
