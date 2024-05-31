import repository from './repository';
// import Router from '@/router';
import moment from 'moment';
export default {
    namespaced: true,
    state: {
        conditions: {
            title: '',
            dateFrom: moment().subtract(1, 'month').format('YYYY-MM-DD'),
            dateTo: moment().format('YYYY-MM-DD'),
            page: 1,
            size: 10
        },
        listData: {
            list: [],
            paging: {}
        }
    },
    mutations: {
        setList(state, payload) {
            state.listData.list = payload;
        },
        setPaging(state, payload) {
            state.listData.paging = payload;
        }
    },
    actions: {
        getListHelps(context) {
            repository.getListHelps(context.state.conditions).then((res) => {
                let data = res.data;
                if ((data.Code = 200 && data.Data)) {
                    context.commit('setList', data.Data.list);
                }
            });
        }
    }
};
