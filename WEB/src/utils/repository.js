import axios from 'axios';
import store from '@/store';
import messages, { MSG_TYPE, MSG_TITLE } from './messages';

const baseUrl =
    // eslint-disable-next-line no-undef
    (process.env.VUE_APP_BASE_DOMAIN ?? 'http://localhost:9090') +
    // eslint-disable-next-line no-undef
    (process.env.VUE_APP_BASE_PATH ?? '/api/v1');

// eslint-disable-next-line no-undef
const timeout = process.env.VUE_APP_API_TIMEOUT ?? 60000;

var repository = axios.create({
    baseURL: baseUrl,
    timeout: timeout
});
repository.interceptors.request.use(
    function (config) {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        const isNoLoading = store.state.app.isNoLoading;
        store.commit('app/showLoading');
        if (!isNoLoading) {
            store.commit('app/increaseCountLoading');
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

repository.interceptors.response.use(
    function (response) {
        const countLoading = store.state.app.countLoading;
        if (countLoading - 1 <= 0) {
            store.commit('app/hideLoading');
        }
        store.commit('app/decreaseCountLoading');
        const { data } = response;
        if (data.Code !== 200) {
            store.commit('app/showModalMessage', {
                type: MSG_TYPE.ERROR,
                title: MSG_TITLE.E999,
                content:
                    data.Code === 401
                        ? messages.E401
                        : data.Code === 403
                          ? messages.E403
                          : messages.E999,
                callback: () => {
                    if (data.Code === 401) {
                        sessionStorage.setItem(
                            'beforeUrl',
                            window.location.pathname
                        );
                        sessionStorage.removeItem('token');
                        sessionStorage.removeItem('tokenTimeout');
                    }
                }
            });
            store.commit('app/hideForceLoading');
        }
        return response;
    },
    function (error) {
        const countLoading = store.state.app.countLoading;
        if (countLoading - 1 <= 0) {
            store.commit('app/hideLoading');
            store.commit('app/hideForceLoading');
        }
        store.commit('app/decreaseCountLoading');
        store.commit('app/showModalMessage', {
            type: MSG_TYPE.ERROR,
            content: messages.E999
        });
        console.log(error);
        return Promise.reject(error);
    }
);

export default repository;
