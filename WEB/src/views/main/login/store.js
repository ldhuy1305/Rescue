import repository from './repository';
import Router from '@/router';
import store from '@/store';
export default {
    namespaced: true,
    state: {
        detail: {
            email: '',
            password: '',
            saveAccount: false
        },
        validRules: {
            email: 'required|email',
            password: 'required'
        }
    },
    actions: {
        login(context, user) {
            try {
                repository.checkAccount(user).then((res) => {
                    const { data } = res;
                    if (data.Code === 200 && data.Data.access_token) {
                        store.commit('app/setUser', data.Data.user);
                        sessionStorage.setItem('token', data.Data.access_token);
                        sessionStorage.setItem(
                            'tokenTimeout',
                            new Date(
                                new Date().getTime() + data.Data.timeout * 60000
                            )
                        );
                        if (data.Data.user.role_id == 1)
                            Router.push({
                                name: 'home'
                            });
                        else
                            Router.push({
                                name: 'signup'
                            });
                        if (context.state.detail.saveAccount) {
                            localStorage.setItem(
                                'email',
                                btoa(context.state.detail.email)
                            );
                            localStorage.setItem(
                                'password',
                                btoa(context.state.detail.password)
                            );
                        } else {
                            localStorage.removeItem('email');
                            localStorage.removeItem('password');
                        }
                    }
                });
            } catch (e) {
                console.log('Action login: ' + e.message);
            }
        }
    }
};
