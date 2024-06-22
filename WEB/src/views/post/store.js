import repository from './repository';
import Router from '@/router';
export default {
    namespaced: true,
    state: {
        detail: {
            title: '',
            image: '',
            sapo: '',
            start_date: new Date(),
            end_date: new Date(),
            city: '',
            district: '',
            ward: '',
            address: '',
            content: ''
        }
    },
    mutations: {
        setDetail(state, payload) {
            state.detail = payload;
        },
        setContent(state, payload) {
            state.content = payload;
        },
        setUsers(state, payload) {
            state.users = payload;
        }
    },
    actions: {
        getInitData(context, payload) {
            try {
                repository.getPost(payload).then((res) => {
                    let data = res.data;
                    if (
                        data.Code == 200 &&
                        data.Data.detail &&
                        data.Data.users
                    ) {
                        context.commit('setDetail', data.Data.detail);
                        context.commit('setUsers', data.Data.users);
                    } else Router.push('/404');
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        },
        createTransaction(context, payload) {
            try {
                repository.addTransaction(payload).then(() => {
                    // let data = res.data;
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
