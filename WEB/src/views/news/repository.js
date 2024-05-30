import repository from '@/utils/repository';

const resource = 'approval';
export default {
    getInit: (payload) => {
        return repository.get(`/${resource}`, { params: payload });
    }
};
