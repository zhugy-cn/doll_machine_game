<template>
  <div class="home-page">
    <div
      v-show="isStart"
      class="mask"
      @touchstart.stop.prevent="()=>{}"
    ></div>
    <!-- 音效 -->
    <audio
      ref="commonAudio"
      id="commonAudio"
    ></audio>
    <!-- toast -->
    <transition name="toast-fade">
      <div
        v-show="isToast"
        class="zui-toast"
      >{{toastMsg}}</div>
    </transition>
    <section class="zui-main">
      <!-- 主要内容 -->
      <div class="zui-main__body">
        <div class="zui-main__logo"></div>
        <!-- 导航 -->
        <div class="zui-main__nav">
          <div
            class="nav__balance"
            v-click-zoom
            @click="dialogVisible=true"
          >
            <i class="nav__balance__icon"></i>
            <span class="nav__balance__num">016544</span>
            <i class="nav__balance__add"></i>
          </div>
        </div>
        <!-- 夹子 -->
        <div
          class="zui-main__clip"
          :class="{active:isDown}"
        >
          <i class="clip__line"></i>
          <i class="clip__circle"></i>
          <i
            class="clip__left"
            :class="{active:isOpen}"
          ></i>
          <i
            class="clip__right"
            :class="{active:isOpen}"
          ></i>
        </div>
        <!-- 商品列表 -->
        <div class="zui-main__dolls">
          <div
            class="dolls__list"
            :style="{ 'transform':'translate3d('+count+'px,0,0', 'width': dollUl.length*dollW + 'px' }"
          >
            <div
              class="dolls__item"
              :class="{catch: index==idx}"
              v-for="(item,index) in dollUl"
              :key="index"
            >
              <div
                class="dolls__item__face"
                :class="'face-'+item.face"
              ></div>
              <div class="dolls__item__goods">
                <img
                  class="goods__img"
                  :src="item.imgurl"
                >
                <p class="goods__name">{{item.name}}</p>
              </div>
            </div>
          </div>
        </div>
        <!-- 抓中的商品 -->
        <div
          class="dolls__item dolls__item__catch"
          :class="{active:isShow,'ani1': isAni == 1, 'ani2': isAni == 2}"
          ref="dollItem"
        >
          <div
            class="dolls__item__face"
            :class="'face-'+catchData.face"
          ></div>
          <div class="dolls__item__goods">
            <img
              class="goods__img"
              :src="catchData.imgurl"
            >
            <p class="goods__name">{{catchData.name}}</p>
          </div>
        </div>
        <!-- 洞 -->
        <div
          class="zui-main___hole"
          :class="{ 'hole_open': isHole }"
        ></div>
      </div>
      <!-- 左右闪光 -->
      <div class="zui-main__light--left">
        <i
          class="zui-main__light__dot"
          :class="{'twinkle':isLight}"
        ></i>
      </div>
      <div class="zui-main__light--right">
        <i
          class="zui-main__light__dot"
          :class="{'twinkle':isLight}"
        ></i>
      </div>
    </section>
    <section class="zui-notice"></section>

    <!-- 底部控制 -->
    <section class="zui-control">
      <div class="zui-control__hole"></div>
      <div
        class="zui-control__coin"
        :class="{active: isStart}"
      ></div>
      <div class="zui-control__cover"></div>
      <div
        class="zui-control__btn"
        :class="{active: isBtnOn}"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></div>
    </section>
    <!-- 打开红包效果 -->
    <open-red-packet
      :open="isOpenRedPacket"
      @complete="onComplete"
    ></open-red-packet>
    <!-- 充值弹层 -->
    <zui-dialog :visible.sync="dialogVisible"></zui-dialog>
  </div>
</template>
<script>
let lineTimer;
let dollsTimer;
let flag = false;
let goods = [
  {
    imgurl: "http://resourse.zskwl.cn/1531916929596",
    showtype: "thing",
    virtual: "virtual",
    name: "可口可乐"
  },
  {
    imgurl: "http://resourse.zskwl.cn/1532894193731",
    showtype: "thing",
    virtual: "virtual",
    name: "矿泉水"
  },
  {
    imgurl: "http://resourse.zskwl.cn/1531917201938",
    showtype: "thing",
    virtual: "virtual",
    name: "冰露"
  },
  {
    imgurl: "http://resourse.zskwl.cn/1531917531042",
    showtype: "thing",
    virtual: "virtual",
    name: "红牛"
  }
];
import OpenRedPacket from "_com/open-red-packet/open-red-packet.vue";
import ZuiDialog from "_com/dialog/dialog.vue";
import toastMixin from "./toast";
import { mapActions } from "vuex";
import clickZoom from "@/directive/click-zoom";

import clickAudio from "@/assets/audio/click.mp3";
import getAudio from "@/assets/audio/get.mp3";
import zhongjAudio from "@/assets/audio/zhongj.mp3";
import smallAudio from "@/assets/audio/small.mp3";
import jiaziAudio from "@/assets/audio/jiazi.mp3";
import dropAudio from "@/assets/audio/drop.mp3";
import saluteAudio from "@/assets/audio/salute.mp3";

export default {
  name: "home",
  mixins: [toastMixin],
  components: {
    OpenRedPacket,
    ZuiDialog
  },
  directives: {
    clickZoom
  },
  data() {
    return {
      goods,
      dollUl: [],
      chance: 30, // 中奖概率 0 100
      dialogVisible: false,
      isLight: false, // 闪烁灯
      isStart: false, // 金币
      isBtnOn: false, // 开始按钮
      isDown: false, // 钩子下落
      isOpen: false, // 钩子张开
      dollW: 0, // 单项的宽度
      count: 0, // 偏移值
      idx: -1, // 抓中的索引
      idxon: 0, // 钩中的真实公仔序号
      isShow: false, // 钩中的公仔显示
      catchData: {}, // 钩中的数据
      isAni: 0, // 中奖结束的动画
      isHole: false, // 打开洞
      isOpenRedPacket: false
    };
  },
  created() {
    let dollUl = goods.concat(goods);
    dollUl.map((v, i) => {
      v.face = parseInt(Math.random() * 3 + 1);
    });
    this.dollUl = dollUl;
    this.$nextTick(() => {
      let dollW = this.$refs.dollItem.offsetWidth;
      let count = -dollW * goods.length;
      this.dollW = dollW;
      this.count = count + 260;
    });
    // 闪烁灯
    lineTimer = setInterval(() => {
      this.isLight = !this.isLight;
    }, 600);

    // 商品
    dollsTimer = setInterval(() => {
      this.count++;
      if (this.count > 0) {
        this.count = -this.goods.length * this.dollW;
      }
    }, 1000 / 60);
  },
  mounted() {
    this.commonAudio = this.$refs.commonAudio;
  },
  methods: {
    ...mapActions(["setToastAct"]),
    onComplete() {
      this.isOpenRedPacket = false;
    },
    touchStart() {
      this.playAudio(dropAudio);
      if (this.isStart) return;
      this.isStart = true;
      this.isBtnOn = true;
      this.isOpen = true;
      this.isDown = true;
      this.gameStart();
    },
    touchEnd() {
      this.isBtnOn = false;
    },
    // 游戏开始
    gameStart() {
      setTimeout(() => {
        const { count, dollW, goods } = this;
        let length = goods.length;
        // let distX = dollW - (Math.abs(count) % dollW);
        let distX = Math.abs(count) % dollW;
        // console.log(dollW - (Math.abs(count) % dollW)); // 114 - 80
        // console.log(Math.abs(count) % dollW);
        let min = 0;
        let max = dollW;
        let i = dollW / 2 / 100; // 表示百分之一的概率
        let val = parseInt(this.chance * i);
        // 57 57 100%
        // 0 113 0%
        if (distX < min + val || distX > max - val) {
          // 抓到娃娃
          // 总共往右移动了多少个商品，因为是双倍所以要乘以 2
          let j = parseInt(((count + length * dollW) / dollW) * 2);
          let idx = parseInt(((length + 1) * 2 - j) / 2);
          // 四舍五入，count / dollW 如果大于1.5说明过半了
          // console.log(Math.round(Math.abs(count / dollW)) + 1);
          let idxon = idx >= length ? idx - length : idx;
          this.idx = idx; // 双倍的
          this.idxon = idxon; // 实际的
          this.isShow = true; // 显示钩中的娃娃
          this.isDown = false; // 钩子往上拉
          this.catchData = goods[idxon]; // 钩中的数据
          this.gamePrize();
        } else {
          // 没有抓到娃娃
          this.showToast("没有夹准,看准时机出夹!");
          this.playAudio(jiaziAudio);
          this.isDown = false;
          this.isOpen = false;
          this.gameReset(1500);
        }
      }, 1500);
    },
    // 请求后端是否中奖
    gamePrize() {
      this.playAudio(getAudio);
      setTimeout(() => {
        this.playAudio(saluteAudio);
      }, 1500);
      // 中奖
      this.gameSuc();
      // 未中奖
      // this.gameFail();
    },
    // 中奖
    gameSuc() {
      setTimeout(() => {
        this.isAni = 1;
        setTimeout(() => {
          this.playAudio(zhongjAudio);
          this.isOpen = false;
          this.isOpenRedPacket = true;
          this.gameReset();
        }, 400);
      }, 3000);
    },
    // 未中奖
    gameFail() {
      setTimeout(() => {
        this.showToast("差一点就中奖啦！");
        this.playAudio(smallAudio);
        this.isAni = 2;
        this.isOpen = false;
        this.isHole = true;
        setTimeout(() => {
          this.gameReset();
        }, 1000);
      }, 3000);
    },
    // 游戏重置
    gameReset(tim = 0) {
      setTimeout(() => {
        this.idx = -1;
        this.isAni = 0;
        this.isShow = false;
        this.isHole = false;
        this.isDown = false;
        this.isStart = false;
      }, tim);
    },
    playAudio(src) {
      this.commonAudio.src = src;
      this.commonAudio.play();
    }
  }
};
</script>
<style lang='stylus' scoped src="./Home.styl">
</style>