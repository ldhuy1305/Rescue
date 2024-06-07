import repository from '@/utils/repository';
const resource = 'committee';
export default {
    getListHelp: (payload) => {
        return repository.get(`/${resource}/approval`, { params: payload });
    },
    getPost: (id) => {
        return repository.get(`approval/${id}`);
    }
};
