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
            pagination: {
                size: 10,
                page: 1,
                total: 1
            }
        },
        options: [
            {
                code: 10,
                name: '10 đơn'
            },
            {
                code: 20,
                name: '20 đơn'
            },
            {
                code: 50,
                name: '50 đơn'
            }
        ]
    },
    mutations: {
        setList(state, payload) {
            state.listData.list = payload;
        },
        setPaging(state, payload) {
            state.listData.pagination = payload;
        },
        setPageAndSize(state, payload) {
            state.conditions.page = payload.currentPage;
            state.conditions.size = payload.perPage;
        }
    },
    actions: {
        getListHelps(context) {
            repository.getListHelps(context.state.conditions).then((res) => {
                let data = res.data;
                let pagingData = {
                    size: 10,
                    page: 1,
                    total: 1
                };
                if ((data.Code = 200 && data.Data)) {
                    context.commit('setList', data.Data.list);
                    if (data.Data.list.length > 0) {
                        pagingData = {
                            size: parseInt(data.Data.list[0].size),
                            page: parseInt(data.Data.list[0].page),
                            total: parseInt(data.Data.list[0].total)
                        };
                        context.commit('setPaging', pagingData);
                    }
                }
            });
        }
    }
};
