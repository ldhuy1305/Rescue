import repository from '@/utils/repository';
export default {
    getUser: () => {
        return repository.get(`/user`);
    }
};
