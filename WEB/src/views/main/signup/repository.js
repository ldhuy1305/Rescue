import repository from '@/utils/repository';
export default {
    sendEmail: (payload) => {
        return repository.post(`send-email`, payload);
    }
};
