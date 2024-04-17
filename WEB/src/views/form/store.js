import repository from './repository';

export default {
    namespaced: true,
    state: {},
    mutations: {},
    actions: {
        onSave(context, payload) {
            try {
                repository.save(payload).then((res) => {
                    const { data } = res;
                    console.log(data);
                });
            } catch (e) {
                console.log('Action: ' + e.message);
            }
        }
    }
};
