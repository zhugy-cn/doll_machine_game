<template>
  <transition name="zui-dialog-fade">
    <div class="zui-dialog" v-show="visible">
      <div class="zui-dialog__mask" @click="$emit('update:visible',false)"></div>
      <div class="game-dialog">
        <div class="game-dialog__header">游戏规则</div>
        <div class="game-dialog__body">
          <p>玩法说明：</p>
          <p>娃娃能否夹中，取决于出夹的时机，未夹中不扣除积分。</p>
          <p>娃娃夹起后能否成功放入背包，取决于奖品的概率。</p>
          <p>奖品将以兑换券形式发放到用户的账户中，用户可以在一个月内在指定机器中使用。</p>
          <p>奖品图片仅供参考，具体奖品请以实际的为准。</p>
        </div>
        <div class="game-dialog__footer" v-click-zoom @click="$emit('update:visible',false)">继续游戏</div>
      </div>
    </div>
  </transition>
</template>
<script>
import clickZoom from "@/directive/click-zoom";

export default {
  props: ["visible"],
  name: "game-rule",
  directives: {
    clickZoom
  },
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
  top 45%
  left 50%
  transform translate(-50%, -50%)
  width 80%
  background #ffeabb
  border #ffb86a solid 8px
  border-radius 16px
  box-sizing border-box
  color #a46a2c
  padding 40px 30px
  &__header
    font-size 36px
    text-align center
    font-weight 700
  &__body
    padding 20px 0 40px
    font-size 22px
    line-height 1.5
    p
      font-weight 700
      margin 14px 0
  &__footer
    height 64px
    line-height 64px
    color #fff
    font-size 28px
    text-align center
    border-radius 50px
    background #ee4b3e
.zui-dialog-fade-enter-active
  animation dialog-fadein 0.4s
  .game-dialog
    animation dialog-zoom 0.3s
@keyframes dialog-fadein
  0%
    opacity 0.5
  100%
    opacity 1
@keyframes dialog-zoom
  0%
    transform translate(-50%, -50%) scale(0.8)
  50%
    transform translate(-50%, -50%) scale(1.08)
  100%
    transform translate(-50%, -50%) scale(1)
</style>