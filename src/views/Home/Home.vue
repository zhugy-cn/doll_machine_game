<template>
  <div class="home-page">
    <div v-show="isStart" class="mask" @touchstart.stop.prevent="()=>{}"></div>
    <!-- 音效 -->
    <audio ref="commonAudio" id="commonAudio"></audio>
    <!-- toast -->
    <transition name="toast-fade">
      <div v-show="isToast" class="zui-toast">{{toastMsg}}</div>
    </transition>
    <section class="zui-main">
      <!-- 主要内容 -->
      <div class="zui-main__body">
        <div class="zui-main__logo"></div>
        <!-- 导航 -->
        <div class="zui-main__nav">
          <div class="nav__balance" v-click-zoom @click="dialogVisible=true">
            <i class="nav__balance__icon"></i>
            <span class="nav__balance__num">
              <countTo :startVal="startVal" :endVal="point" :duration="2000" separator></countTo>
            </span>
            <i class="nav__balance__add"></i>
          </div>
          <transition name="coin_down">
            <div class="nav__balance__reduce" v-show="changeCoin">-{{single_price}}</div>
          </transition>
          <!-- 游戏规则 -->
          <div class="nav__rule" v-click-zoom @click="gameRuleVisible=true"></div>
        </div>
        <!-- 夹子 -->
        <div class="zui-main__clip" :class="{active:isDown}">
          <i class="clip__line"></i>
          <i class="clip__circle"></i>
          <i class="clip__left" :class="{active:isOpen}"></i>
          <i class="clip__right" :class="{active:isOpen}"></i>
        </div>
        <!-- 商品列表 -->
        <div class="zui-main__dolls">
          <div
            class="dolls__list"
            :style="{ 'transform':'translate3d('+offsetLeft+'px,0,0', 'width': dollUl.length*dollW + 'px' }"
          >
            <div
              class="dolls__item"
              :class="['bg-'+item.face,{catch: index==idx || index==idxon}]"
              v-for="(item,index) in dollUl"
              :key="index"
            >
              <div class="dolls__item__face"></div>
              <div class="dolls__item__goods" v-if="item.good_info">
                <img class="goods__img" :src="item.good_info.img">
                <p class="goods__chance">{{((single_price / item.price )*100).toFixed(2)}}%</p>
                <p class="goods__name">{{item.good_info.good_name}}</p>
              </div>
            </div>
            <!-- <doll-item :dollUl="dollUl" :idx="idx"></doll-item> -->
          </div>
        </div>
        <!-- 抓中的商品 -->
        <div
          class="catch__doll__wrap"
          ref="dollItem"
          :class="{active:isShow,'ani1': isAni == 1, 'ani2': isAni == 2}"
        >
          <div
            class="dolls__item dolls__item__catch"
            :class="['bg-'+catchData.face,{isCatch:isCatch}]"
          >
            <div class="dolls__item__face"></div>
            <div class="dolls__item__goods" v-if="catchData.good_info">
              <img class="goods__img" :src="catchData.good_info.img">
              <p
                class="goods__chance"
              >{{Math.min(100,((single_price / catchData.price )*100).toFixed(2))}}%</p>
              <p class="goods__name">{{catchData.good_info.good_name}}</p>
            </div>
          </div>
        </div>
        <!-- 洞 -->
        <div class="zui-main___hole" :class="{ 'hole_open': isHole }"></div>
      </div>
      <!-- 左右闪光 -->
      <div class="zui-main__light--left">
        <i class="zui-main__light__dot" :class="{'twinkle':isLight}"></i>
      </div>
      <div class="zui-main__light--right">
        <i class="zui-main__light__dot" :class="{'twinkle':isLight}"></i>
      </div>
    </section>
    <section class="zui-notice"></section>

    <!-- 底部控制 -->
    <section class="zui-control">
      <div class="zui-control__hole"></div>
      <div class="zui-control__coin" :class="{active: isStart}">{{single_price}}</div>
      <div class="zui-control__cover"></div>
      <div
        class="zui-control__btn"
        :class="{active: isBtnOn}"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></div>
    </section>
    <!-- 打开红包效果 -->
    <open-red-packet :visible.sync="isOpenRedPacket" :prizeInfo="prizeInfo"></open-red-packet>
    <!-- 充值弹层 -->
    <zui-dialog :visible.sync="dialogVisible"></zui-dialog>
    <!-- 游戏规则 -->
    <game-rule :visible.sync="gameRuleVisible"></game-rule>
  </div>
</template>
<script src="./Home.js"></script>
<style lang='stylus' scoped src="./Home.styl"></style>