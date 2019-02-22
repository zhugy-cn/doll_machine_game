<template>
  <div class="page-maintain">
    <div class="maintain__header">温馨提示</div>
    <div class="maintain__content">
      <div class="maintain__subtit">尊敬的客户：</div>由于
      <span class="sys-bold">{{maintainInfo.des}}</span>
      <br>我公司将于
      <span class="sys-bold">{{maintainInfo.start_time | formatDate}}</span>
      至
      <span class="sys-bold">{{maintainInfo.end_time | formatDate}}</span>
      期间对系统进行维护升级，升级期间系统暂停运行，敬请谅解！
    </div>
  </div>
</template>
<script>
import { formatDate } from "@/libs/filters";

export default {
  props: {
    maintainInfo: {
      type: Object
    }
  },
  filters: {
    formatDate
  }
};
</script>
<style lang='stylus' scoped>
.page-maintain
  padding 50px
  .maintain__header
    font-size 36px
    padding 20px 0 60px
    text-align center
  .maintain__content
    color #666
    font-size 28px
    line-height 1.6
    .maintain__subtit
      margin-bottom 10px
    .sys-bold
      color #016d9d
</style>