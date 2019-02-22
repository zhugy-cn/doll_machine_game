<template>
  <div id="app">
    <z-toast/>
    <maintain v-if="isMaintenance" :maintainInfo="maintainInfo"/>
    <router-view v-else class="root-router"/>
  </div>
</template>
<script>
import ZToast from "_com/toast/toast.vue";
import { isMaintenance_api } from "_api/goods";
import Maintain from "_com/maintain/maintain";

export default {
  components: {
    ZToast,
    Maintain
  },
  data() {
    return {
      isMaintenance: false,
      maintainInfo: {}
    };
  },
  created() {
    this.checkAuth();
    this.checkMaintain();
  },
  methods: {
    // 检查权限
    checkAuth() {
      let unionid = localStorage.getItem("unionid");
      if (!unionid) {
        location.href = "http://app.zskwl.cn/?machineID=1888912/";
      }
    },
    // 维修状态
    async checkMaintain() {
      let res = await isMaintenance_api();
      if (res.status === 1) {
        this.isMaintenance = true;
        this.maintainInfo = res;
      } else {
        this.isMaintenance = false;
      }
    }
  }
};
</script>