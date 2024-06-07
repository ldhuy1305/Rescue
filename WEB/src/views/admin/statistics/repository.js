import repository from '@/utils/repository';
export default {
    checkAccount: (payload) => {
        return repository.post('account/login', payload);
    }
};
