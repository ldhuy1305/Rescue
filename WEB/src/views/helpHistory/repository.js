import repository from '@/utils/repository';

const resource = 'help';
export default {
    getListHelps(payload) {
        return repository.get(`${resource}`, { params: payload });
    }
};
