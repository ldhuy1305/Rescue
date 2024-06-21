import repository from '@/utils/repository';
const resource = 'committee';
export default {
    getListPost: (payload) => {
        return repository.get(`/${resource}/post`, { params: payload });
    },
    getListUser: (id, payload) => {
        return repository.get(`/${resource}/user/${id}`, { params: payload });
    },
    export: (payload) => {
        return repository.get(`/${resource}/post/export`, {
            responseType: 'blob',
            params: payload
        });
    }
};
