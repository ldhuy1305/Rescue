import axios from 'axios';

const baseUrl =
    (import.meta.env.VUE_APP_BASE_DOMAIN ?? 'example.com') +
    (import.meta.env.VUE_APP_BASE_PATH ?? '/api/v1');
const timeout = import.meta.env.VUE_APP_API_TIMEOUT ?? 60000;

var repository = axios.create({
    baseURL: baseUrl,
    timeout: timeout
});

export default repository;
