export default {
    globalLoading: state => state.app.globalLoading,
    loadingMessage: state => state.app.loadingMessage,
    globalModal: state => state.app.globalModal,
    globalToast: status => status.app.globalToast,
    toastMessage: status => status.app.toastMessage,
}