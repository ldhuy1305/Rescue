import repository from '@/utils/repository';

const resource = 'user';
export default {
    updateUser: (payload) => {
        return repository.put(`${resource}/me`, payload);
    },
    updateAvatar: (avatar) => {
        return repository.patch(`${resource}/me`, avatar, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    changePass: (payload) => {
        return repository.post(`${resource}/me/change-password`, payload);
    }
};
