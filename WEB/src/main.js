// Import the necessary packages
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// Create the app instance
const app = createApp(App);

// Mount the app to the DOM
app.use(store);
app.use(router);
app.mount('#app');
