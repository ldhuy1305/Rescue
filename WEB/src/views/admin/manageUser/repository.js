import repository from '@/utils/repository';
const resource = 'committee';
export default {
    getListUser: (payload) => {
        return repository.get(`/${resource}/user`, { params: payload });
    }
};
