<template>
  <transition name="zui-fade">
    <div v-show="open" class="game-success" :class="{'active': isCloud}">
      <!-- 云 -->
      <div class="zui-cloud"></div>
      <!-- 光 -->
      <div class="zui-light"></div>
      <!-- 星星 -->
      <div class="zui-star">
        <div class="zui-star__wrap">
          <div class="zui-star__item">
            <i class="zui-star__icon"></i>
            <i class="zui-star__icon"></i>
          </div>
          <div class="zui-star__item">
            <i class="zui-star__icon"></i>
            <i class="zui-star__icon"></i>
          </div>
          <div class="zui-star__item">
            <i class="zui-star__icon"></i>
            <i class="zui-star__icon"></i>
          </div>
        </div>
      </div>
      <!-- 红包 -->
      <transition name="zui-packet">
        <img v-show="isPacket" class="zui-packet" src="../../assets/images/yw_bg.png" alt>
      </transition>
      <!-- 字体 -->
      <transition name="zui-text">
        <div v-show="isText" :class="{active:isTextActiv}" class="zui-text">
          <img class="zui-text__img" src="../../assets/images/bfl.png" alt>
          <img class="zui-text__img" src="../../assets/images/zjl.png" alt>
        </div>
      </transition>

      <!-- 抓中提示 -->
      <transition name="zui-main">
        <div class="game-dialog" v-show="isOpen">
          <div class="game-dialog__header">恭喜</div>
          <div class="game-dialog__body">恭喜获得抵用券</div>
          <div class="game-dialog__footer">
            <div class="game-dialog__btn" @click="buttonClick('left')">立即使用</div>
            <div class="game-dialog__btn" @click="buttonClick('right')">再来一局</div>
          </div>
        </div>
      </transition>

      <!-- 开红包 -->
      <!-- <transition name="zui-main">
      <div class="zui-main" v-show="isOpen" :class="{'active':isOpenActive}">
        <div class="zui-main__body"></div>
        <div class="zui-main__header"></div>
        <div class="zui-main__footer"></div>
      </div>
      </transition>-->
    </div>
  </transition>
</template>
<script>
export default {
  props: ["open"],
  data() {
    return {
      isCloud: true, // 云动画
      isPacket: false, // 红包动画
      isTextActiv: false, // 字体动画
      isText: false, // 字体外层盒子动画
      isOpenActive: false, // 打开红包动画
      isOpen: false // 字体外层盒子动画
    };
  },
  watch: {
    open(val) {
      if (val) {
        this.startAni();
      }
    }
  },
  methods: {
    startAni() {
      // 云动画
      this.isCloud = true;
      setTimeout(() => {
        // 云动画停止开始红包动画
        this.isCloud = false;
        this.isPacket = true;
        setTimeout(() => {
          // 红包动画进入完毕开始字体动画
          this.isText = true;
          this.isTextActiv = true;
        }, 400);
        setTimeout(() => {
          // 停止红包动画
          this.isPacket = false;
          setTimeout(() => {
            // 停止字体动画
            this.isText = false;
            setTimeout(() => {
              // 打开对话框
              this.isOpen = true;
              // setTimeout(() => {
              // this.isOpenActive = true;
              // setTimeout(() => {
              //   this.isOpen = false;
              // }, 1000);
              // }, 250);
            }, 300);
          }, 100);
        }, 1500);
      }, 500);
    },
    buttonClick(type) {
      this.isOpen = false;
      setTimeout(() => {
        this.$emit("complete", type);
      }, 100);
    }
  }
};
</script>
<style lang='stylus' scoped>
.game-success
  position fixed
  z-index 999
  top -40px
  left 0
  right 0
  bottom 0
  background-color rgba(0, 0, 0, 0.5)
  &.active
    .zui-cloud, .zui-light, .zui-star__wrap
      visibility visible
    .zui-cloud
      animation zui-cloud-ani 0.5s step-start
    .zui-light
      animation zui-light-ani 0.5s ease-out
    .zui-star__wrap
      animation zui-star-ani 0.5s ease-out
  // 公共样式
  .zui-cloud, .zui-light, .zui-star__wrap
    visibility hidden
// 云
.zui-cloud
  position relative
  width 100%
  height 50%
  background url('~_assets/images/peng_1.png') no-repeat top / contain
// 光
.zui-light
  position absolute
  top 180px
  left -12%
  width 120%
  height 220px
  opacity 0.6
  background url('~_assets/images/ppp.png') no-repeat center
  background-size cover
// 星星
.zui-star
  position absolute
  top 260px
  left 50%
  margin-left -25px
  width 50px
  height 50px
  &__wrap
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 60px
  &__item
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    width 100%
    transform-origin left
    &:nth-child(1)
      transform rotate(90deg) translate(-50%, -50%)
      i:nth-child(1)
        left 14px
      i:nth-child(2)
        right 14px
    &:nth-child(2)
      transform rotate(27deg) translate(-50%, -50%)
    &:nth-child(3)
      transform rotate(153deg) translate(-50%, -50%)
  &__icon
    position absolute
    top 0
    transform translateY(-50%)
    width 60px
    height 60px
    background-image url('~_assets/images/levelup_button.png')
    background-size contain
    &:nth-child(1)
      left 0
    &:nth-child(2)
      right 0
// 红包
.zui-packet
  position absolute
  top -20px
  left 0
  right 0
  bottom 0
  width 90%
  margin auto
// 字体
.zui-text
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  height 240px
  margin auto
  overflow hidden
  &.active &__img
    &:nth-child(1)
      animation move-text1 1.5s ease-out
    &:nth-child(2)
      animation move-text2 1.5s ease-out
  &__img
    height 84px
    display block
    &:nth-child(1)
      margin-bottom 40px
    &:nth-child(2)
      float right
// 弹层
.game-dialog
  position absolute
  top 0
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
    font-size 40px
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
// 开奖结果
.zui-main, .zui-main__header, .zui-main__footer, .zui-main__body
  position absolute
  left 0
  right 0
.zui-main__header, .zui-main__footer
  transform translate3d(0, 0, 0)
  transition all 0.3s ease-out
  background-size cover !important
.zui-main
  top 0
  bottom 0
  &.active
    .zui-main__header
      transform translate3d(0, -60%, 0)
    .zui-main__footer
      transform translate3d(0, 60%, 0)
  &__body
    top 0
    bottom 0
    background-color rgb(70, 169, 255)
  &__header
    top 0
    bottom 46%
    background url('~_assets/images/packet-top.png') no-repeat bottom
  &__footer
    top 46%
    bottom 0
    background url('~_assets/images/packet-bom.png') no-repeat top
// 红包动画
.zui-packet-enter-active
  animation zui-packet_in 0.4s
.zui-packet-leave-active
  animation zui-packet_out 0.4s
// 字体动画
.zui-text-leave-active
  animation zui-text_out 0.1s ease-out
// 打开红包动画
.zui-main-enter-active
  animation zui-main_in 0.4s
.zui-main-leave-active
  animation zui-main_out 0.4s
// 云
@keyframes zui-cloud-ani
  20%
    background-image url('~_assets/images/peng_1.png')
  40%
    background-image url('~_assets/images/peng_2.png')
  60%
    background-image url('~_assets/images/peng_3.png')
  80%
    background-image url('~_assets/images/peng_4.png')
  100%
    background-image url('~_assets/images/peng_5.png')
// 光
@keyframes zui-light-ani
  100%
    opacity 0
// 星星
@keyframes zui-star-ani
  100%
    width 340px
    opacity 0.4
    transform translate(-50%, -50%) scale(1.5)
// 红包
@keyframes zui-packet_in
  0%
    transform scale(0.4)
  50%
    transform scale(1.1)
  100%
    transform scale(1)
@keyframes zui-packet_out
  0%
    transform scale(1)
  50%
    transform scale(1.1)
  100%
    transform scale(0.2)
// 字体
@keyframes move-text1
  0%
    transform translate3d(30%, 0, 0)
  100%
    transform translate3d(0, 0, 0)
@keyframes move-text2
  0%
    transform translate3d(-30%, 0, 0)
  100%
    transform translate3d(0, 0, 0)
@keyframes zui-text_out
  100%
    transform scale(1.1)
    opacity 0.5
// 打开红包动画
@keyframes zui-main_in
  0%
    transform scale(0.5)
  100%
    transform scale(1)
@keyframes zui-main_out
  from
    opacity 1
  50%
    opacity 0
    transform scale3d(0.6, 0.6, 0.6)
  to
    opacity 0
.zui-fade-leave-active
  animation fadeOut 0.3s
@keyframes fadeOut
  from
    opacity 1
  to
    opacity 0
</style>