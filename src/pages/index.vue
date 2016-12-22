<template lang="pug">
div
  div(class="bg")
    img(src="../assets/bg2.jpg")
  div(flex="dir:top" class="content")
    div(flex="main:center cross:center")
      Vbutton(:type="`start`" @click="extShowModal = true")
        span(slot="buttonTitle") 开始考试
      Vbutton(:type="`rank`" @click="rateShowModal = true")
        span(slot="buttonTitle") 答题排行榜
    div(flex="main:center cross:center" class="activity-info")
      div(@click="infoShowModal = true")
        i(class="iconfont icon-xinxi")
        span 查看活动介绍
  modal(v-if="extShowModal" color="#fa4d8d" @click="doExam(paperId,timelimit)")
    div(slot="head-bg")
      img(src="../assets/titlebg.png" style="width:45%;max-height:50px;")
    span(slot="header") 选择科目
    div(slot="body")
      List(:list="list" \:paperId="paperId" @onPropsChange="change")
    div(slot="footer" flex="dir:left" style="width:100%;")
      Vbutton(:type="`do`" @click="doExam(paperId,timelimit)")
        span(slot="buttonTitle") 开始考试
      Vbutton(:type="`back`" @click="extShowModal = false")
        span(slot="buttonTitle") 返回
  modal(v-show="rateShowModal" color="#ffb400")
    div(slot="head-bg")
      img(src="../assets/titlebg.png" style="width:45%;max-height:50px;")
    span(slot="header") 排行榜
    div(slot="body")
      Vtable
    div(slot="footer" flex="dir:left" style="width:100%;")
      Vbutton(:type="`do`" @click="start")
        span(slot="buttonTitle") 开始考试
      Vbutton(:type="`back`" @click="rateShowModal = false")
        span(slot="buttonTitle") 返回
  modal(v-show="infoShowModal" color="#69a2fc")
    div(slot="head-bg")
      img(src="../assets/titlebg2.png" style="width:45%;max-height:50px;")
    span(slot="header") 活动介绍
    div(slot="body")
      span 活动介绍。
    div(slot="footer" flex="dir:left" style="width:100%;")
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

// function fetchRankingList(store) {
//   return store.dispatch('FETCH_PAPER_LIST_DATA', {
//     paperList: [store.state.paperList]
//   })
// }

export default {
    components: {
        Modal,
        List,
        Vtable,
        Vbutton
    },
    data() {
        return {
          extShowModal: false,
          rateShowModal: false,
          infoShowModal: false,
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
    beforeMount (){
      document.title = "我的考试"
      fetchPaperList(this.$store).then(()=>{
        this.list = this.$store.getters.getPaperList
      })
    }
}
</script>

<style scoped lang="stylus" src="../stylus/pages/index.styl"></style>
