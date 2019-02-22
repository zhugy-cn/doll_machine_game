let lineTimer;
let dollsTimer;
import OpenRedPacket from "_com/open-red-packet/open-red-packet.vue";
import ZuiDialog from "_com/dialog/dialog.vue";
import GameRule from "_com/game-rule/game-rule.vue";
import DollItem from '_com/doll-item/doll-item.vue'
import countTo from "vue-count-to";

import toastMixin from "./toast";
import clickZoom from "@/directive/click-zoom";

import getAudio from "@/assets/audio/get.mp3";
import zhongjAudio from "@/assets/audio/zhongj.mp3";
import smallAudio from "@/assets/audio/small.mp3";
import jiaziAudio from "@/assets/audio/jiazi.mp3";
import dropAudio from "@/assets/audio/drop.mp3";
import saluteAudio from "@/assets/audio/salute.mp3";

import { getPrizeList_api, getUserInfo_api, playGame_api } from "_api/goods";
export default {
  name: "home",
  mixins: [toastMixin],
  components: {
    OpenRedPacket,
    ZuiDialog,
    countTo,
    DollItem,
    GameRule
  },
  directives: {
    clickZoom
  },
  data() {
    return {
      goods: [],
      dollUl: [],
      machine_id: 1888912,
      chance: 30, // 中奖概率 0 100
      startVal: 0,
      point: 0, // 积分
      single_price: 0, // 抽奖单价
      prizeInfo: {}, // 奖品信息
      isLight: false, // 闪烁灯
      isStart: false, // 金币
      isBtnOn: false, // 开始按钮
      isDown: false, // 钩子下落
      isOpen: false, // 钩子张开
      dollW: 0, // 单项的宽度
      offsetLeft: 0, // 偏移值
      idx: -1, // 抓中的索引
      idxon: -1, // 钩中的真实公仔序号
      isShow: false, // 钩中的公仔显示
      catchData: {}, // 钩中的数据
      isAni: 0, // 中奖结束的动画
      isHole: false, // 打开洞
      isCatch: false, // 抓住娃娃动画
      changeCoin: false,  // 积分减少
      dialogVisible: false, // 充值弹层
      gameRuleVisible: false, // 游戏规则
      isOpenRedPacket: false
    };
  },
  async created() {
    this._loadData()
  },
  mounted() {
    this.$nextTick(() => {
      this.commonAudio = this.$refs.commonAudio;
    })
  },
  methods: {
    // 获取商品列表
    async _loadData() {
      const toast = this.$createToast({
        time: 0,
        mask: true,
        txt: '加载中...'
      })
      toast.show();
      let { machine_id } = this.$route.params;
      if (!machine_id) {
        // machine_id = 1888912
        this.$global.showToast({
          duration: 5000,
          message: '请求地址非法，请从售货机页面进入！',
        })
        return
      }
      let [goodInfo, userInfo] = await Promise.all([
        getPrizeList_api(machine_id),
        getUserInfo_api(),
      ]);

      let { goods, single_price } = goodInfo;
      this.point = userInfo.point;
      this.single_price = single_price;
      this.goods = goods;
      let dollUl = goods.concat(goods);
      dollUl.map((v, i) => {
        v.face = parseInt(Math.random() * 4 + 1);
      });
      this.dollUl = dollUl;
      this.$nextTick(() => {
        let dollW = this.$refs.dollItem.offsetWidth;
        let offsetLeft = -dollW * goods.length;
        this.dollW = dollW;
        this.offsetLeft = offsetLeft;
      });
      // 闪烁灯
      lineTimer = setInterval(() => {
        this.isLight = !this.isLight;
      }, 600);
      // 商品
      dollsTimer = setInterval(() => {
        this.offsetLeft++;
        if (this.offsetLeft > 0) {
          this.offsetLeft = -this.goods.length * this.dollW;
        }
      }, 1000 / 60);
      toast.hide()
    },
    touchStart() {
      this.playAudio(dropAudio);
      if (this.isStart) return;
      if (this.point < this.single_price) {
        this.showToast("积分不足，请先充值！");
        return;
      }
      this.isStart = true;
      this.isBtnOn = true;
      this.isOpen = true;
      this.isDown = true;
      this.gameStart();
    },
    touchEnd() {
      this.isBtnOn = false;
      // 18785273024
    },
    // 游戏开始
    gameStart() {
      setTimeout(async () => {
        const { offsetLeft, dollW, goods } = this;
        let length = goods.length;
        // let distX = dollW - (Math.abs(offsetLeft) % dollW);
        let distX = Math.abs(offsetLeft) % dollW;
        // console.log(dollW - (Math.abs(offsetLeft) % dollW)); // 114 - 80
        // console.log(Math.abs(offsetLeft) % dollW);
        let min = 0;
        let max = dollW;
        let i = dollW / 2 / 100; // 表示百分之一的概率
        let val = parseInt(this.chance * i);
        // 57 57 100%
        // 0 113 0%
        if (distX < min + val || distX > max - val) {
          // 抓到娃娃
          // 总共往右移动了多少个商品，因为是双倍所以要乘以 2
          let j = parseInt(((offsetLeft + length * dollW) / dollW) * 2);
          let idx = parseInt(((length + 1) * 2 - j) / 2);
          // 四舍五入，offsetLeft / dollW 如果大于1.5说明过半了
          // console.log(Math.round(Math.abs(offsetLeft / dollW)) + 1);
          let idxon = idx >= length ? idx - length : idx;
          this.idx = idx; // 双倍的
          this.idxon = idxon; // 实际的

          this.isShow = true; // 显示钩中的娃娃
          this.isDown = false; // 钩子往上拉
          this.catchData = goods[idxon]; // 钩中的数据
          this.gamePlay();
        } else {
          // 没有抓到娃娃
          // this.showToast("没有夹准,看准时机出夹!");
          this.showToast("未夹中，不扣除积分，继续努力！");
          this.playAudio(jiaziAudio);
          this.isDown = false;
          this.isOpen = false;
          this.gameReset(1500);
        }
        setTimeout(() => {
          this.playAudio(saluteAudio);
        }, 1400);
      }, 1500);
    },
    // 请求后端是否中奖
    async gamePlay() {
      // 1500 后到顶部
      this.playAudio(getAudio);
      let startTime = new Date().getTime();
      this.isCatch = true;
      setTimeout(() => {
        this.changeCoin = false;
      }, 3000)
      let params = {
        machine_id: this.machine_id,
        single_price: this.single_price,
        goods_id: this.catchData.good_id,
      }
      try {
        let { balance, isWin, prize } = await playGame_api(params);
        // 减掉金币
        this.startVal = this.point;
        this.point = this.point - this.single_price;
        this.changeCoin = true;
        
        
        this.point = balance;
        let endTime = new Date().getTime();
        let diff = 3000 - (endTime - startTime);
        let delay = 0;
        if (diff > 0) {
          delay = diff
        } else {
          delay = 0
        }
        setTimeout(() => {
          // 中奖
          if (isWin == 1) {
            this.gameSuc();
            this.prizeInfo = prize;
          } else {
            this.gameFail();
          }
        }, delay)
      } catch (error) {
        setTimeout(() => {
          this.gameFail();
        }, 2000)
      }
    },
    // 中奖
    gameSuc() {
      // 执行动画一
      this.playAudio(zhongjAudio);
      this.isAni = 1;
      setTimeout(() => {
        this.isOpen = false;
        this.isOpenRedPacket = true;
        this.gameReset();
      }, 400);
    },
    // 未中奖
    gameFail() {
      this.showToast("差一点就中奖啦！");
      this.playAudio(smallAudio);
      this.isCatch = false;
      this.isAni = 2;
      this.isOpen = false;
      this.isHole = true;
      setTimeout(() => {
        this.gameReset();
      }, 1500);
    },
    // 游戏重置
    gameReset(tim = 0) {
      setTimeout(() => {
        this.idx = -1;
        this.idxon = -1;
        this.isAni = 0;
        this.isShow = false;
        this.isHole = false;
        this.isDown = false;
        this.isStart = false;
      }, tim);
    },
    playAudio(src) {
      let commonAudio = this.commonAudio;
      commonAudio.src = src;
      commonAudio.play();
    }
  }
};
