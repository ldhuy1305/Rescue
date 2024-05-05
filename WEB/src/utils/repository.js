import axios from 'axios';
import store from '@/store';

const baseUrl =
    (import.meta.env.VUE_APP_BASE_DOMAIN ?? 'http://localhost:9090') +
    (import.meta.env.VUE_APP_BASE_PATH ?? '/api/v1');
const timeout = import.meta.env.VUE_APP_API_TIMEOUT ?? 60000;

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
            if (data.Code === 422) {
                try {
                    for (const key in data.DataErrors) {
                        if (
                            Object.prototype.hasOwnProperty.call(
                                data.DataErrors,
                                key
                            )
                        ) {
                            try {
                                // eslint-disable-next-line no-undef
                                // $(`#${key}, [name="${key}"]`).ItemError(
                                //     messages[data.DataErrors[key][0]]
                                // );
                            } catch (ex) {
                                console.log(ex);
                            }
                        }
                    }
                } catch (ex) {
                    console.log(ex);
                }
            } else if (data.Code === 423 || data.Code === 999) {
                // store.commit('app/showModalMessage', {
                //     type: MSG_TYPE.ERROR,
                //     content: data.Message,
                //     callback: () => {
                //         if (appData.onApiError) {
                //             appData.onApiError();
                //         }
                //     }
                // });
            } else {
                store.commit('app/showModalMessage', {
                    // type: MSG_TYPE.ERROR,
                    // title: MSG_TITLE.E999,
                    // // eslint-disable-next-line prettier/prettier
                    // content:
                    //     data.Code === 401
                    //         ? messages.E401
                    //         : data.Code === 403
                    //           ? messages.E403
                    //           : messages.E999,
                    // callback: () => {
                    //     if (data.Code === 401) {
                    //         sessionStorage.setItem(
                    //             'beforeUrl',
                    //             window.location.pathname
                    //         );
                    //         sessionStorage.removeItem('token');
                    //         sessionStorage.removeItem('tokenTimeout');
                    //         Router.push(appData.loginScreen);
                    //     }
                    // }
                });
            }
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
        // store.commit('app/showModalMessage', {
        //     type: MSG_TYPE.ERROR,
        //     content: messages.E999
        // });
        return Promise.reject(error);
    }
);

export default repository;
