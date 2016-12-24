<template lang="pug">
.btn(@click="handleClick")
  div(
    flex="main:center cross=center"
    v-bind:class="classObject"
    )
    span
      slot(name="buttonTitle") &nbsp;
</template>

<script>
  export default {
    name: "Vbutton",
    props: {
      type: {
        type: String,
        default: 'default'
      },
    },
    data(){
      return {
        classObject:[
          this.type ? `btn-${this.type}` : '',
        ]
      }
    },
    methods:{
      handleClick(evt){
        this.$emit('click', evt)
      }
    }
  }
</script>

<style scoped lang="stylus" src="../stylus/components/button_new.styl"></style>
