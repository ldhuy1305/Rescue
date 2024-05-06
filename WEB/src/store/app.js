import messages, { MSG_TYPE, MSG_TITLE } from '@/utils/messages';
export default {
    namespaced: true,
    state: {
        isLoading: false,
        isForceLoading: false,
        isShowModalMessage: false,
        modalMessage: {
            type: MSG_TYPE.ERROR,
            title: '',
            content: '',
            okText: 'Ok',
            cancelText: 'Cancel',
            callback: () => {}
        }
    },
    mutations: {
        showLoading(state) {
            state.isLoading = true;
        },
        hideLoading(state) {
            state.isLoading = false;
        },
        showForceLoading(state) {
            state.isForceLoading = true;
        },
        hideForceLoading(state) {
            state.isForceLoading = false;
        },
        setScreenId(state, id) {
            state.screenId = id;
        },
        setNoLoading(state, val) {
            state.isNoLoading = val;
        },
        increaseCountLoading(state) {
            state.countLoading += 1;
        },
        decreaseCountLoading(state) {
            state.countLoading -= 1;
            if (state.countLoading < 0) {
                state.countLoading = 0;
            }
        },
        showModalMessage(state, message) {
            state.isShowModalMessage = true;
            console.log(message);
            if (message) {
                if (message.type) {
                    state.modalMessage.type = message.type;
                } else {
                    state.modalMessage.type = MSG_TYPE.ERROR;
                }
                state.modalMessage.title = message.title;
                if (message.content) {
                    state.modalMessage.content = message.content;
                } else {
                    state.modalMessage.content = messages.E999;
                }
                if (message.okText) {
                    state.modalMessage.okText = message.okText;
                } else {
                    state.modalMessage.okText = 'Ok';
                }
                if (message.cancelText) {
                    state.modalMessage.cancelText = message.cancelText;
                } else {
                    state.modalMessage.cancelText = 'Cancel';
                }
                state.modalMessage.callback = message.callback;
            } else {
                state.modalMessage = {
                    type: MSG_TYPE.ERROR,
                    title: MSG_TITLE.E999,
                    content: messages.E999,
                    okText: 'Ok',
                    cancelText: 'Cancel',
                    callback: () => {}
                };
            }
        },
        updateShowModalMessage(state, value) {
            state.isShowModalMessage = value;
        },
        hideModalMessage(state) {
            state.isShowModalMessage = false;
            setTimeout(() => {
                state.modalMessage = {
                    type: MSG_TYPE.ERROR,
                    title: '',
                    content: '',
                    okText: 'Ok',
                    cancelText: 'Cancel',
                    callback: () => {}
                };
            }, 250);
        }
    }
};
