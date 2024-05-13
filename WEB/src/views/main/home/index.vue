<script>
import template from './template.html';
import Header from '@/shared/header';
import LandingPage from '@/shared/landing-page';
import Footer from '@/shared/footer';
import './style.scss';

import helpers from '@/utils/helpers';
import { mapActions, mapMutations } from 'vuex';
import homeStore from './store';
import store from '@/store';
import messages, { MSG_TYPE } from '@/utils/messages';
const home = {
    name: 'home',
    template: template,
    components: { Header, LandingPage, Footer },
    data() {
        return {
            params: helpers.decodeParams(this.$route.query.p)
        };
    },
    beforeCreate() {
        if (!store.hasModule('home')) {
            store.registerModule('home', homeStore);
        }
    },
    created() {
        if (this.$route.query.p) {
            const now = new Date().getTime();
            const cre_at = new Date(this.params.cre_at).getTime();
            console.log(this.$route.query.p);
            delete this.params.cre_at;
            const isValid = now - cre_at <= 1000 * 60 * 10;
            if (isValid) {
                this.signUp(this.params);
            } else {
                this.showModalMessage({
                    type: MSG_TYPE.ERROR,
                    content: messages.E064
                });
            }
        }
    },
    methods: {
        ...mapActions('home', ['signUp']),
        ...mapMutations('app', ['showModalMessage'])
    }
};
export default home;
</script>
