import repository from '@/utils/repository';
export default {
    getUser: () => {
        return repository.get(`/user/me`);
    },
    delete: (publicId) => {
        return repository.delete(`proof/${publicId}`);
    }
};
