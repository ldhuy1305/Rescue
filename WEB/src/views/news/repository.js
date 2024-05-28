import repository from '@/utils/repository';

const resource = 'approvals';
export default {
    getInit: (payload) => {
        return repository.get(`${resource}`, payload);
    }
};
