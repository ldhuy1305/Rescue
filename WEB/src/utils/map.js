/* eslint-disable no-undef */
import axios from 'axios';

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_VN;
// eslint-disable-next-line no-undef
const timeout = process.env.VUE_APP_API_TIMEOUT ?? 60000;
var repository = axios.create({
    baseURL: baseUrl,
    timeout: timeout
});
export default {
    getAllCities() {
        return repository.get('/1/0.htm');
    },
    getDistrictsByCity(city_id) {
        return repository.get(`/2/${city_id}.htm`);
    },
    getWardsByDistrict(district_cd) {
        return repository.get(`/3/${district_cd}.htm`);
    }
    // getTotal(){
    //     return repository.get('/1/0.htm');
    // }
};
