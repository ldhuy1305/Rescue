import repository from '@/utils/repository';
export default {
    forgotPassword: (payload) => {
        return repository.post(`account/forgot/${payload.email}`, {
            password: payload.password
        });
    }
};
