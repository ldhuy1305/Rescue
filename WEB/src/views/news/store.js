import repository from './repository';
// import Router from '@/router';
import store from '@/store';
import map from '@/utils/map';
// import moment from 'moment';
const initCondition = {
    keyword: '',
    city: '0',
    district: '0',
    ward: '0',
    size: 2,
    page: 1,
    is_all: true
};
export default {
    namespaced: true,
    state: {
        conditions: { ...initCondition },
        listData: {
            list: [],
            pagination: {
                size: 2,
                page: 1,
                total: 1
            }
        },
        location: {
            cities: [
                {
                    code: '0',
                    name: 'Tỉnh/Thành'
                }
            ],
            districts: [
                {
                    code: '0',
                    name: 'Quận/Huyện'
                }
            ],
            wards: [
                {
                    code: '0',
                    name: 'Phường/Xã'
                }
            ]
        }
    },
    mutations: {
        setData(state, payload) {
            state.listData.list = payload;
        },
        setPaging(state, payload) {
            state.listData.pagination = payload;
        },
        setPageAndSize(state, payload) {
            state.conditions.page = payload.currentPage;
            state.conditions.size = payload.perPage;
        },
        setCities(state, payload) {
            state.location.cities = payload;
        },
        setDistricts(state, payload) {
            state.location.districts = payload;
        },
        setWards(state, payload) {
            state.location.wards = payload;
        },
        setAddressConditions(state) {
            if (
                state.conditions.city == '0' &&
                state.conditions.district != '0'
            )
                state.conditions.district = '0';
            if (
                state.conditions.district == '0' &&
                state.conditions.ward != '0'
            )
                state.conditions.ward = '0';
        }
    },
    actions: {
        getInitData(context) {
            try {
                context.commit('setAddressConditions');
                repository.getInit(context.state.conditions).then((res) => {
                    const { data } = res;
                    let pagingData = {
                        size: 2,
                        page: 1,
                        total: 1
                    };
                    if (data.Code === 200 && data.Data.list) {
                        context.commit('setData', data.Data.list);
                        if (data.Data.list.length > 0) {
                            pagingData = {
                                size: parseInt(data.Data.list[0].size),
                                page: parseInt(data.Data.list[0].page),
                                total: parseInt(data.Data.list[0].total)
                            };
                        }
                        context.commit('setPaging', pagingData);
                    }
                    map.getAllCities().then((res) => {
                        let data = res.data.data;
                        let newData = [
                            {
                                code: '0',
                                name: 'Tỉnh/Thành'
                            }
                        ];
                        data.forEach((item) => {
                            newData.push({
                                name: item.full_name,
                                code: item.id
                            });
                        });
                        context.commit('setCities', newData);
                    });
                });
            } catch (e) {
                console.log('Action change pass: ' + e.message);
            }
        },
        getDistricts(context, id) {
            try {
                store.commit('app/showLoading');
                map.getDistrictsByCity(id).then((res) => {
                    let data = res.data.data;
                    let newData = [
                        {
                            code: '0',
                            name: 'Quận/Huyện'
                        }
                    ];
                    data.forEach((item) => {
                        newData.push({ name: item.full_name, code: item.id });
                    });
                    context.commit('setDistricts', newData);
                    store.commit('app/hideLoading');
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        },
        search(context) {
            try {
                context.commit('setAddressConditions');
                repository.getInit(context.state.conditions).then((res) => {
                    const { data } = res;
                    let pagingData = {
                        size: 2,
                        page: 1,
                        total: 1
                    };
                    if (data.Code === 200 && data.Data.list) {
                        context.commit('setData', data.Data.list);
                        if (data.Data.list.length > 0) {
                            pagingData = {
                                size: parseInt(data.Data.list[0].size),
                                page: parseInt(data.Data.list[0].page),
                                total: parseInt(data.Data.list[0].total)
                            };
                        }
                        context.commit('setPaging', pagingData);
                    }
                });
            } catch (e) {
                console.log('Action change pass: ' + e.message);
            }
        },
        getWards(context, id) {
            try {
                store.commit('app/showLoading');
                map.getWardsByDistrict(id).then((res) => {
                    let data = res.data.data;
                    let newData = [
                        {
                            code: '0',
                            name: 'Phường/Xã'
                        }
                    ];
                    data.forEach((item) => {
                        newData.push({ name: item.full_name, code: item.id });
                    });
                    context.commit('setWards', newData);
                    store.commit('app/hideLoading');
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
