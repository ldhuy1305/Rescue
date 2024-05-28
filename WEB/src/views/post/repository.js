import repository from '@/utils/repository';
export default {
    getPost: (id) => {
        return repository.get(`approval/${id}`);
    },
    addTransaction: (payload) => {
        return repository.post('transaction', payload);
    }
};
