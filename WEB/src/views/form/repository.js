import repository from '@/utils/repository';
export default {
    save: (payload) => {
        return repository.post(`proof`, {
            images: payload.images
        });
    }
};
