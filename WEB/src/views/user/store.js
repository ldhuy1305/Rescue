import repository from './repository';
// import Router from '@/router';
import store from '@/store';
const initData = {
    oldPass: '',
    newPass: '',
    confirmedPass: ''
};
export default {
    namespaced: true,
    state: {
        pass: {
            oldPass: '',
            newPass: '',
            confirmedPass: ''
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
        changePassword(context) {
            try {
                repository.changePass(context.state.pass).then((res) => {
                    const { data } = res;
                    if (data.Code === 200 && data.Data) {
                        context.commit('setPass', { ...initData });
                    }
                });
            } catch (e) {
                console.log('Action change pass: ' + e.message);
            }
        }
    }
};
