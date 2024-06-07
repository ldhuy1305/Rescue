import repository from './repository';
const initConditions = {
    keyword: '',
    city: '0',
    district: '0',
    ward: '0',
    size: 10,
    page: 1,
    is_all: true
};
export default {
    namespaced: true,
    state: {
        listData: {
            list: [],
            pagination: {
                size: 10,
                page: 1,
                total: 1
            }
        },
        conditions: { ...initConditions },
        options: [
            {
                code: 10,
                name: '10'
            },
            {
                code: 20,
                name: '20'
            },
            {
                code: 50,
                name: '50'
            }
        ],
        paramSends: {
            id: '',
            list: [],
            pagination: {
                size: 10,
                page: 1,
                total: 1
            }
        }
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
        },
        setParamSendsList(state, payload) {
            state.paramSends.list = payload;
        },
        setParamSendsPaging(state, payload) {
            state.paramSends.pagination = payload;
        },
        setParamSendsId(state, payload) {
            state.paramSends.id = payload;
        }
    },
    actions: {
        getInitData(context) {
            try {
                repository.getListPost(context.state.conditions).then((res) => {
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
            } catch (e) {
                console.log('Action getInit: ' + e.message);
            }
        },
        getListUser(context, id) {
            try {
                const conditions = {
                    page: 1,
                    size: 10
                };
                repository.getListUser(id, conditions).then((res) => {
                    let data = res.data;
                    let pagingData = {
                        size: 10,
                        page: 1,
                        total: 1
                    };
                    if ((data.Code = 200 && data.Data)) {
                        context.commit('setParamSendsList', data.Data.list);
                        context.commit('setParamSendsId', id);
                        if (data.Data.list.length > 0) {
                            pagingData = {
                                size: parseInt(data.Data.list[0].size),
                                page: parseInt(data.Data.list[0].page),
                                total: parseInt(data.Data.list[0].total)
                            };
                            context.commit('setParamSendsPaging', pagingData);
                        }
                    }
                });
            } catch (e) {
                console.log('Action getListUser: ' + e.message);
            }
        }
    }
};
