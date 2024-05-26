import repository from './repository';
import store from '@/store';
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
                        console.log(data.Data.user);
                    }
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
