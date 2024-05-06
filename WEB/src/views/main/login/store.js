import repository from './repository';
import Router from '@/router';

export default {
    namespaced: true,
    state: {
        saveAccount: false,
        detail: {
            email: '',
            password: ''
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
                    if (data.Code === 200 && data.Data.token) {
                        sessionStorage.setItem('token', data.Data.token);
                        sessionStorage.setItem(
                            'tokenTimeout',
                            new Date(
                                new Date().getTime() + data.Data.timeout * 60000
                            )
                        );
                        if (data.Data.role_id == 1)
                            Router.push({
                                name: 'home'
                            });
                        else
                            Router.push({
                                name: 'admin'
                            });
                        if (context.state.saveAccount) {
                            localStorage.setItem(
                                'email',
                                btoa(context.state.detail.email)
                            );
                            localStorage.setItem(
                                'password',
                                btoa(context.state.detail.password)
                            );
                        } else {
                            localStorage.removeItem('account');
                        }
                    }
                });
            } catch (e) {
                console.log('Action login: ' + e.message);
            }
        }
    }
};
