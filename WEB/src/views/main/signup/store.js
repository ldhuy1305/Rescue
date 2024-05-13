// import repository from './repository';
import store from '@/store';
import map from '@/utils/map';
import repository from './repository';
export default {
    namespaced: true,
    state: {
        detail: {
            email: '',
            password: '',
            confirmPassword: '',
            lastName: '',
            firstName: '',
            phoneNumber: '',
            city: '',
            district: '',
            ward: '',
            address: ''
        },
        validRules: {
            email: 'required|email',
            password: 'required|password',
            confirmPassword: 'required',
            lastName: 'required',
            firstName: 'required',
            phoneNumber: 'required',
            city: 'required',
            district: 'required',
            ward: 'required',
            address: 'required'
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
        },
        sendEmail(context, payload) {
            try {
                repository.sendEmail(payload).then(() => {});
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
