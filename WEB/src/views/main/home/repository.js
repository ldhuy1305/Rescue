import repository from '@/utils/repository';
export default {
    signUp: (payload) => {
        return repository.post(`user`, payload);
    }
};
