<template>
  <transition name="zui-fade">
    <div class="zui-toast__main" v-show="globalToast">
      <span class="zui-toast__text" v-show="globalToast">{{toastMessage}}</span>
    </div>
    <!-- <div class="zui-toast__main" v-show="true">
      <span class="zui-toast__text" v-show="true">所广泛大锅饭</span>
    </div>-->
  </transition>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {},
  computed: {
    ...mapGetters(["globalToast", "toastMessage"])
  }
};
</script>
<style lang='stylus' scoped>
.zui-toast__main
  position fixed
  z-index 9999
  left 0
  bottom 300px
  width 100%
  text-align center
  .zui-toast__text
    display inline-block
    height 50px
    line-height 50px
    color #fff
    font-size 20px
    border-radius 5px
    padding 2px 24px 0
    word-break break-all
    box-sizing border-box
    background-color rgba(0, 0, 0, 0.7)
.zui-fade-enter-active
  animation bounceInUp 0.3s
@keyframes bounceInUp
  from, 60%, 75%, 90%, to
    -webkit-animation-timing-function cubic-bezier(0.215, 0.61, 0.355, 1)
    animation-timing-function cubic-bezier(0.215, 0.61, 0.355, 1)
  from
    opacity 0
    -webkit-transform translate3d(0, 200%, 0)
    transform translate3d(0, 200%, 0)
  60%
    opacity 1
    -webkit-transform translate3d(0, -10PX, 0)
    transform translate3d(0, -10PX, 0)
  75%
    -webkit-transform translate3d(0, 3PX, 0)
    transform translate3d(0, 3PX, 0)
  90%
    -webkit-transform translate3d(0, -3PX, 0)
    transform translate3d(0, -3PX, 0)
  to
    -webkit-transform translate3d(0, 0, 0)
    transform translate3d(0, 0, 0)
</style>