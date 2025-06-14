import repository from './repository';
// import Router from '@/router';
import store from '@/store';
import messages, { MSG_TITLE, MSG_TYPE } from '@/utils/messages';
const initData = {
    oldPass: '',
    newPass: '',
    confirmedPass: ''
};
export default {
    namespaced: true,
    state: {
        userData: {},
        pass: {
            oldPass: '',
            newPass: '',
            confirmedPass: ''
        },
        validRules1: {
            lastName: 'required|name',
            firstName: 'required|name',
            phoneNumber: 'required|phone',
            address: 'required'
        },
        validRules2: {
            oldPass: 'required',
            newPass: 'required',
            confirmedPass: 'required'
        }
    },
    mutations: {
        setPass(state, payload) {
            state.pass = payload;
        }
    },
    actions: {
        save(context, url) {
            try {
                repository.updateUser(url).then((res) => {
                    const { data } = res;
                    if (data.Code === 200 && data.Data) {
                        store.commit('app/setUser', data.Data.user);
                        store.commit('app/showModalMessage', {
                            type: MSG_TYPE.SUCCESS,
                            title: MSG_TITLE.C999,
                            content: messages.S005
                        });
                    }
                });
            } catch (e) {
                console.log('Action save: ' + e.message);
            }
        },
        updateAvatar(context, url) {
            try {
                repository.updateAvatar(url).then((res) => {
                    const { data } = res;
                    if (data.Code === 200 && data.Data) {
                        store.commit('app/setUser', data.Data.user);
                    }
                });
            } catch (e) {
                console.log('Action update avatar: ' + e.message);
            }
        },
        changePass(context) {
            try {
                repository.changePass(context.state.pass).then((res) => {
                    const { data } = res;
                    if (data.Code === 200 && data.Data) {
                        context.commit('setPass', { ...initData });
                        store.commit('app/showModalMessage', {
                            type: MSG_TYPE.SUCCESS,
                            title: MSG_TITLE.C999,
                            content: messages.S004
                        });
                    }
                });
            } catch (e) {
                console.log('Action change pass: ' + e.message);
            }
        }
    }
};
