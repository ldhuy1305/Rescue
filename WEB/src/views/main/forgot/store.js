import repository from './repository';
import store from '@/store';
import { MSG_TYPE, MSG_TITLE } from '@/utils/messages';
export default {
    namespaced: true,
    state: {
        detail: {
            email: ''
        },
        validRules: {
            email: 'required|email'
        }
    },
    actions: {
        forgotPassword(context, payload) {
            try {
                repository.forgotPassword(payload).then((res) => {
                    let data = res.data;
                    if (data.Code == 200) {
                        store.commit('app/showModalMessage', {
                            type: MSG_TYPE.SUCCESS,
                            title: MSG_TITLE.C999,
                            content: data.Message
                        });
                    }
                });
            } catch (e) {
                console.log('Action login: ' + e.message);
            }
        }
    }
};
