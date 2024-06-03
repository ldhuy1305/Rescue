// Import the necessary packages
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import ImageUploadVue from 'image-upload-vue';
import BootstrapVue3 from 'bootstrap-vue-3';
// Create the app instance
const app = createApp(App);
// Mount the app to the DOM
app.use(store);
app.use(router);
app.use(ImageUploadVue);
app.use(BootstrapVue3);
app.mount('#app');
