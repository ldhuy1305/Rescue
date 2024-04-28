import repository from './repository';
import store from '../../store';
import map from '../../utils/map';
// import _ from 'lodash';
export default {
    namespaced: true,
    state: {
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
        },
        detail: {
            city: ''
        }
    },
    mutations: {
        // setWard(context, code) {
        //     context.state.wards = wards[code];
        // },
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
        onSave(context, payload) {
            try {
                repository.save(payload).then((res) => {
                    const { data } = res;
                    console.log(data);
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        },
        getInitData(context) {
            try {
                store.commit('app/showLoading');
                map.getAllCities().then((res) => {
                    let data = res.data.data;
                    let newData = [
                        {
                            code: '0',
                            name: 'Tỉnh/Thành'
                        }
                    ];
                    data.forEach((item) => {
                        newData.push({ name: item.full_name, code: item.id });
                    });
                    context.commit('setCities', newData);
                    store.commit('app/hideLoading');
                });
            } catch (e) {
                console.log('Action: ' + e.message);
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
