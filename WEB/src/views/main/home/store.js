import repository from './repository';
// import _ from 'lodash';
export default {
    namespaced: true,
    actions: {
        signUp(context, payload) {
            try {
                repository.signUp(payload).then(() => {});
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
