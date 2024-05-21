import repository from './repository';
import store from '../../store';
import map from '../../utils/map';
import helpers from '@/utils/helpers';
import { MSG_TYPE } from '@/utils/messages';
import router from '@/router';
// import axios from 'axios';
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
            title: '',
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
        },
        addContent(state) {
            state.contents.push({});
        },
        removeContent(state, index) {
            state.contents.splice(index, 1);
        },
        removeNullContent(state) {
            state.contents.filter((item) => Object.keys(item).length !== 0);
        }
    },
    actions: {
        removeContent(context, index) {
            try {
                if (context.state.contents[index].file != '') {
                    const publicId = helpers.getPublicIdFromUrl(
                        context.state.contents[index].file
                    );
                    repository.delete(publicId).then(() => {});
                }
            } catch (e) {
                console.log('Action: ' + e.message);
            }
            context.commit('removeContent', index);
        },
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
        },
        save(context, payload) {
            try {
                repository.save(payload).then((res) => {
                    let data = res.data;
                    if (data.Code == 200) {
                        store.commit('app/showModalMessage', {
                            type: MSG_TYPE.SUCCESS,
                            content: 'Bài đăng ký đã được gửi đi',
                            callback: (ok) => {
                                if (ok) {
                                    router.push('/home');
                                }
                            }
                        });
                    }
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
