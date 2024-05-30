import repository from './repository';
// import Router from '@/router';
// import store from '@/store';
import moment from 'moment';
const initCondition = {
    keyword: '',
    start_date: moment().format('YYYY-MM-DD'),
    end_date: moment().add(1, 'month').format('YYYY-MM-DD'),
    page: 10,
    size: 1
};
export default {
    namespaced: true,
    state: {
        conditions: { ...initCondition },
        listData: {
            list: [],
            page: {
                totalRecord: 10,
                record: '',
                page: 1,
                maxpage: 1
            }
        }
    },
    mutations: {
        setData(state, payload) {
            state.listData.list = payload;
        },
        setPaging(state, payload) {
            state.listData.page = payload;
        }
    },
    actions: {
        getInitData(context) {
            try {
                repository.getInit(context.state.conditions).then((res) => {
                    const { data } = res;
                    if (data.Code === 200 && data.Data.list) {
                        context.commit('setData', data.Data.list);
                    }
                });
            } catch (e) {
                console.log('Action change pass: ' + e.message);
            }
        }
    }
};
