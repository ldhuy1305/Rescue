import repository from '@/utils/repository';
const resource = 'committee';
export default {
    getListHelp: (payload) => {
        return repository.get(`/${resource}/help`, { params: payload });
    },
    export: (payload) => {
        return repository.get(`/${resource}/help/export`, {
            responseType: 'blob',
            params: payload
        });
    }
};
