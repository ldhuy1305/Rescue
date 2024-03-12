import { createStore } from 'vuex';
import AppStore from './app';
export default createStore({
    modules: {
        app: AppStore
    }
});
