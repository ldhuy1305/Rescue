import repository from '@/utils/repository';
export default {
    save: (payload) => {
        return repository.post(`approval`, payload);
        // {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }
    },
    delete: (publicId) => {
        return repository.delete(`proof/${publicId}`);
    },
    init: () => {
        return repository.get({});
    }
};
