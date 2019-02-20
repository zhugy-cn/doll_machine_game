export default {
  data() {
    return {
      isToast: false,
      toastMsg: ''
    }
  },
  methods: {
    showToast(msg) {
      this.toastMsg = msg;
      this.isToast = true
      setTimeout(() => {
        this.isToast = false
      }, 2000)
    }
  },
}