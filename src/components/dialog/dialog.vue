<template>
  <transition name="zui-dialog-fade">
    <div class="zui-dialog" v-show="visible">
      <div class="zui-dialog__mask" @click="$emit('update:visible',false)"></div>
      <div class="game-dialog">
        <div class="game-dialog__header">提示</div>
        <div class="game-dialog__body">即将前往充值页面，是否确定？</div>
        <div class="game-dialog__footer">
          <div class="game-dialog__btn" @click="$emit('update:visible',false)">继续游戏</div>
          <div class="game-dialog__btn">立即前往</div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  props: ["visible"],
  name: "zui-dialog",
  data() {
    return {};
  }
};
</script>
<style lang='stylus' scoped>
.zui-dialog
  position fixed
  z-index 999
  top 0
  left 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, 0.4)
.zui-dialog__mask
  position absolute
  top 0
  left 0
  right 0
  bottom 0
.game-dialog
  position absolute
  z-index 1
  top -40px
  left 0
  right 0
  bottom 0
  margin auto
  width 80%
  height 320px
  background #ffeabb
  border #ffb86a solid 8px
  border-radius 16px
  box-sizing border-box
  font-family Helvetica
  &__header
    position absolute
    top -46px
    left 50%
    transform translateX(-50%)
    width 470px
    height 116px
    color #fff
    font-size 36px
    text-align center
    padding-top 14px
    -webkit-text-stroke 1px #d01922
    background url('~_assets/images/sp_j.png') no-repeat -7px -248px
    background-size 524px auto
    box-sizing border-box
  &__body
    position absolute
    top 120px
    left 0
    right 0
    color #f62d37
    font-size 32px
    text-align center
  &__footer
    position absolute
    bottom 20px
    left 20px
    right 20px
    display flex
  &__btn
    flex 1
    height 64px
    line-height 64px
    color #fff
    font-size 28px
    text-align center
    border-radius 50px
    &:nth-child(1)
      margin-right 20px
      background #ff7b70
    &:nth-child(2)
      background #ee4b3e
.zui-dialog-fade-enter-active
  animation dialog-fadein 0.4s
  .game-dialog
    animation dialog-zoom 0.4s
@keyframes dialog-fadein
  0%
    opacity 0.5
  100%
    opacity 1
@keyframes dialog-zoom
  0%
    transform scale(0.6)
  50%
    transform scale(1.1)
  100%
    transform scale(1)
</style>