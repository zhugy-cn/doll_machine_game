export default {
	state: {
		globalLoading: false,   						// loading是否显示
		loadingMessage: '载入中...',   					// loading显示的内容
		globalToast: false,								// toast是否显示
		toastMessage: '',								// toast显示的内容
		globalModal: false,  							// 全局遮罩层
	},
	mutations: {
		SET_GLOBAL_LOADING(state, options) {
			if (typeof options === 'object') {
				state.loadingMessage = options.message
				state.globalLoading = options.visible
			} else {
				state.loadingMessage = '载入中...';
				state.globalLoading = options;
			}

		},
		SET_GLOBAL_MODAL(state, bool) {
			state.globalModal = bool
		},
		SET_GLOBAL_TOAST(state, options) {
			state.toastMessage = options.message
			state.globalToast = options.visible
		},
	},
	actions: {
		// setToastAct({message:'大手大脚撒',duration: 5000})
		setToastAct({ commit, state }, options) {
			if (state.globalLoading) {
				commit('SET_GLOBAL_LOADING', false)
			}
			let duration;
			if (typeof options === 'object') {
				duration = options.duration;
				commit('SET_GLOBAL_TOAST', {
					...options,
					visible: true,
				})
			} else {
				duration = 2000;
				commit('SET_GLOBAL_TOAST', {
					message: options,
					visible: true,
				})
			}
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				commit('SET_GLOBAL_TOAST', {
					message: '',
					visible: false,
				})
			}, duration)
		}
	}
}