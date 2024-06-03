import repository from './repository';
// import Router from '@/router';
import store from '@/store';
import map from '@/utils/map';
// import moment from 'moment';
const initCondition = {
    keyword: '',
    city: '',
    district: '',
    ward: '',
    size: 10,
    page: 1,
    is_all: true,
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
            state.listData.page = payload;
        },
        setCities(state, payload) {
            state.location.cities = payload;
        },
        setDistricts(state, payload) {
            state.location.districts = payload;
        },
        setWards(state, payload) {
            state.location.wards = payload;
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
