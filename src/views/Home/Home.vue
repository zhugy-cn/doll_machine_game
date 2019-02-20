<template>
  <div class="home-page">
    <!-- 音效 -->
    <!-- <audio src="../../assets/audio/click.mp3" ref="audio"></audio> -->
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
          <div class="nav__balance" @click="dialogVisible=true">
            <i class="nav__balance__icon"></i>
            <span class="nav__balance__num">016544</span>
            <i class="nav__balance__add"></i>
          </div>
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
            :style="{ 'transform':'translate3d('+count+'px,0,0', 'width': dollUl.length*dollW + 'px' }"
          >
            <div
              class="dolls__item"
              :class="{catch: index===idx}"
              v-for="(item,index) in dollUl"
              :key="index"
            >
              <div class="dolls__item__face" :class="'face-'+item.face"></div>
              <div class="dolls__item__goods">
                <img class="goods__img" :src="item.imgurl">
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
          <div class="dolls__item__face" :class="'face-'+catchData.face"></div>
          <div class="dolls__item__goods">
            <img class="goods__img" :src="catchData.imgurl">
            <p class="goods__name">{{catchData.name}}</p>
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
      <div class="zui-control__coin" :class="{active: isStart}"></div>
      <div class="zui-control__cover"></div>
      <div
        class="zui-control__btn"
        :class="{active: isBtnOn}"
        @touchstart="touchStart"
        @touchend="touchEnd"
      ></div>
    </section>
    <!-- 打开红包效果 -->
    <open-red-packet :open="isOpenRedPacket" @complete="onComplete"></open-red-packet>
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
    name: "可口可乐"
  }
];
import OpenRedPacket from "_com/open-red-packet/open-red-packet.vue";
import ZuiDialog from "_com/dialog/dialog.vue";
import toastMixin from "./toast";
import { mapActions } from "vuex";
export default {
  name: "home",
  mixins: [toastMixin],
  components: {
    OpenRedPacket,
    ZuiDialog
  },
  data() {
    return {
      goods,
      dollUl: [],
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
      got: 0, // 抓中为 1
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
      this.audio = this.$refs.audio;
      let dollW = this.$refs.dollItem.offsetWidth;
      let count = -dollW * goods.length;
      this.dollW = dollW;
      this.count = count;
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
  methods: {
    ...mapActions(["setToastAct"]),
    onComplete() {
      this.isOpenRedPacket = false;
    },
    touchStart() {
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
        let distX = Math.abs(count) % dollW;
        console.log(Math.abs(count) % dollW);
        console.log(dollW - (Math.abs(count) % dollW));
        // if (distX < 35 || distX > 70) {
        if (distX < 10 || distX > 80) {
          // 抓到娃娃
          let j = parseInt((count + length * dollW) / (dollW / 2));
          let idx = parseInt(((length + 1) * 2 - j) / 2);
          let idxon = idx >= length ? idx - length : idx;
          this.idx = idx;
          this.idxon = idxon;
          this.isShow = true; // 显示钩中的娃娃
          this.isDown = false; // 钩子往上拉
          this.catchData = goods[idxon]; // 钩中的数据
          this.got = 1;
          this.gamePrize();
        } else {
          // 没有抓到娃娃
          this.showToast("没有夹准,看准时机出夹!");
          this.isDown = false;
          this.isOpen = false;
          this.gameReset(1500);
        }
      }, 1500);
    },
    // 请求后端是否中奖
    gamePrize() {
      // 中奖
      this.gameSuc();
      // 未中奖
      // this.gameFail();
      // this.gameReset(4000);
    },
    // 中奖
    gameSuc() {
      setTimeout(() => {
        this.isAni = 1;
        setTimeout(() => {
          this.isOpen = false;
          this.isOpenRedPacket = true;
          this.gameReset();
        }, 400);
      }, 3000);
    },
    // 未中奖
    gameFail() {
      setTimeout(() => {
        this.isAni = 2;
        this.isOpen = false;
        this.isHole = true;
        this.showToast("差一点就中奖啦！");
      }, 3000);
    },
    // 游戏重置
    gameReset(tim) {
      // setTimeout(() => {
      this.idx = -1;
      this.isAni = 0;
      this.isShow = false;
      this.isHole = false;
      this.isDown = false;
      this.isStart = false;
      this.got = 0;
      // }, tim);
    }
  }
};
</script>
<style lang='stylus' scoped src="./Home.styl">
</style>