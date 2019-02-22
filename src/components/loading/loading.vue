<template>
  <div class="mask" v-show="globalLoading" @touchmove.stop.prevent="()=>false">
    <div class="zui-loading">
      <span class="zui-loading__spinner">
        <svg viewBox="25 25 50 50" class="zui-loading__circular">
          <circle cx="50" cy="50" r="20" fill="none"></circle>
        </svg>
      </span>
      <div class="zui-loading-text">{{loadingMessage}}</div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
  created() {},
  computed: {
    ...mapGetters(["globalLoading", "loadingMessage"])
  }
};
</script>
<style lang='stylus' scoped>
.mask
  position fixed
  z-index 9999
  top 0
  left 0
  right 0
  bottom 0
.zui-loading
  position fixed
  z-index 999
  left 50%
  top 50%
  transform translate(-50%, -50%)
  width 200px
  height 200px
  display flex
  flex-direction column
  justify-content center
  align-items center
  border-radius 10px
  background-color rgba(0, 0, 0, 0.7)
  .zui-loading-text
    font-size 24px
    padding-top 32px
    color #c9c9c9
.zui-loading__spinner
  width 60px
  height 60px
  font-size 0
  line-height 0
  display inline-block
  box-sizing border-box
  -webkit-animation zui-rotate 0.8s linear infinite
  animation zui-rotate 0.8s linear infinite
  -webkit-animation-duration 2s
  animation-duration 2s
.zui-loading__circular
  width 100%
  height 100%
.zui-loading__circular circle
  stroke #c9c9c9
  stroke-width 3
  stroke-linecap round
  -webkit-animation zui-circular 1.5s ease-in-out infinite
  animation zui-circular 1.5s ease-in-out infinite
@keyframes zui-rotate
  from
    -webkit-transform rotate(0deg)
    transform rotate(0deg)
  to
    -webkit-transform rotate(360deg)
    transform rotate(360deg)
@keyframes zui-rotate
  from
    -webkit-transform rotate(0deg)
    transform rotate(0deg)
  to
    -webkit-transform rotate(360deg)
    transform rotate(360deg)
@keyframes zui-circular
  0%
    stroke-dasharray 1, 200
    stroke-dashoffset 0
  50%
    stroke-dasharray 90, 150
    stroke-dashoffset -40
  100%
    stroke-dasharray 90, 150
    stroke-dashoffset -120
@keyframes zui-circular
  0%
    stroke-dasharray 1, 200
    stroke-dashoffset 0
  50%
    stroke-dasharray 90, 150
    stroke-dashoffset -40
  100%
    stroke-dasharray 90, 150
    stroke-dashoffset -120
</style>