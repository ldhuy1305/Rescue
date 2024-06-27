import repository from './repository';
const initConditions = {
    keyword: '',
    page: 1,
    size: 10,
    sort: 'cre_at',
    order: 'desc'
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
        getInitData(context) {
            try {
                repository.getListHelp(context.state.conditions).then((res) => {
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

        export(context) {
            try {
                let payload = { ...context.state.conditions };
                payload.size = 0;
                repository.export(payload).then((res) => {
                    const url = URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'danh_sach_ho_tro.xlsx');
                    document.body.appendChild(link);
                    link.click();
                });
            } catch (e) {
                console.log('Action export: ' + e.message);
            }
        }
    }
};
