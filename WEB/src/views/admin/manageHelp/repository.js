import repository from '@/utils/repository';
const resource = 'committee';
export default {
    getListHelp: (payload) => {
        return repository.get(`/${resource}/help`, { params: payload });
    }
};
