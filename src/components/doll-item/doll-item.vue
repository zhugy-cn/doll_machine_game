<template>
  <div>
    <div
      class="dolls__item"
      :class="{catch: index==idx}"
      v-for="(item,index) in dollUl"
      :key="index"
    >
      <div class="dolls__item__face" :class="'face-'+item.face"></div>
      <div class="dolls__item__goods" v-if="item.good_info">
        <img class="goods__img" :src="item.good_info.img">
        <p class="goods__name">{{item.good_info.good_name}}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["dollUl", "idx"],
  data() {
    return {};
  }
};
</script>
<style lang='stylus' scoped>
.dolls__item
  position relative
  float left
  width 194px
  height 194px
  background url('~_assets/images/nx_man.png') no-repeat 34px 0
  background-size 640px auto
  &__catch
    position absolute
    z-index 99
    top 572px
    left 216px
    visibility hidden
    transition transform 1s 0.5s linear
    &.active
      visibility visible
      transform translate3d(0, -400px, 0)
    &.ani1
      animation doll1 0.6s both
    &.ani2
      animation doll2 1s linear both
    .dolls__item__face
      animation doll_img_faces 0.4s step-start infinite
  &.catch
    visibility hidden
    opacity 0
  &__face
    position absolute
    top 20px
    left 32px
    width 140px
    height 74px
    background url('~_assets/images/nx_man.png') no-repeat 34px 0
    background-size 640px auto
    &.face-1
      background-position -162px -10px
    &.face-2
      background-position -348px -10px
    &.face-3
      background-position -166px -100px
  &__goods
    position absolute
    top 90px
    bottom 10px
    left 0
    right 0
    width 130px
    margin auto
    padding 10px 0 7px
    display flex
    flex-direction column
    align-items center
    justify-content space-between
    background url('~_assets/images/sp_gift.png') no-repeat -180px -8px / 640px auto
    .goods__img
      height 48px
    .goods__name
      color #f8c23f
      font-size 20px
@keyframes doll1
  0%
    transform translate3d(0, -400px, 0) scale(1)
  50%
    transform translate3d(0, -400px, 0) scale(1.2)
  100%
    transform translate3d(0, -400px, 0) scale(0.6)
@keyframes doll2
  0%
    transform translate3d(0, -360px, 0) rotate(0) scale(1)
  90%
    transform translate3d(0, 0, 0) rotate(60deg) scale(0.7)
    opacity 0.8
  100%
    transform translate3d(0, 0, 0) rotate(60deg) scale(0.5)
    opacity 0
@keyframes doll_img_faces
  0%, 31.3%
    background-position -162px -10px
  34.3%, 65.6%
    background-position -348px -10px
  68.6%, 100%
    background-position -166px -100px
</style>