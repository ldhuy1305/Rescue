import repository from './repository';
import store from '@/store';
import messages, { MSG_TITLE, MSG_TYPE } from '@/utils/messages';
// import Router from '@/router';
// import _ from 'lodash';
export default {
    namespaced: true,
    actions: {
        signUp(context, payload) {
            try {
                repository.signUp(payload).then((res) => {
                    const { data } = res;
                    if (data.Code === 200 && data.Data.user) {
                        store.commit('app/setUser', data.Data.user);
                        console.log(store.state.app.user);
                        localStorage.setItem('token', data.Data.access_token);
                        localStorage.setItem(
                            'tokenTimeout',
                            new Date(
                                new Date().getTime() + data.Data.timeout * 60000
                            )
                        );
                        store.commit('app/showModalMessage', {
                            type: MSG_TYPE.SUCCESS,
                            title: MSG_TITLE.C999,
                            content: messages.S001,
                            callback: (ok) => {
                                if (ok) {
                                    const anchor = document.createElement('a');
                                    anchor.href = 'http://localhost:8080/home';
                                    anchor.target = '_self';
                                    anchor.click();
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
