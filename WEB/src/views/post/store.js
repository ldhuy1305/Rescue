import repository from './repository';
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
            address: ''
        },
        contents: []
    },
    mutations: {
        setDetail(state, payload) {
            state.detail = payload;
        },
        setContent(state, payload) {
            state.content = payload;
        }
    },
    actions: {
        getInitData(context, payload) {
            try {
                repository.getPost(payload).then((res) => {
                    let data = res.data.Data;
                    context.commit('setDetail', data.detail);
                    context.commit('setContent', data.content);
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        },
        createTransaction(context, payload) {
            try {
                repository.addTransaction(payload).then((res) => {
                    let data = res.data;
                    console.log(data);
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
