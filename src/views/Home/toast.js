let toastTimer = null;
export default {
  data() {
    return {
      isToast: false,
      toastMsg: ''
    }
  },
  methods: {
    showToast(msg) {
      clearTimeout(toastTimer);
      this.toastMsg = msg;
      this.isToast = true
      toastTimer = setTimeout(() => {
        this.isToast = false
      }, 2000)
    }
  },
}