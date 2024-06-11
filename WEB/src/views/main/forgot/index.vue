<script>
import { mapActions, mapState } from 'vuex';
import template from './template.html';
import './style.scss';

import store from '@/store';
import forgotStore from '@/views/main/forgot/store';
import helpers from '@/utils/helpers';
const forgot = {
    name: 'Forgot',
    template: template,
    beforeCreate() {
        if (!store.hasModule('forgot')) {
            store.registerModule('forgot', forgotStore);
        }
    },
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {},
    computed: {
        ...mapState('forgot', ['detail', 'validRules'])
    },
    methods: {
        ...mapActions('forgot', ['forgotPassword']),
        sendEmail() {
            if (!helpers.isValidData(this.detail, this.validRules)) return;
            const payload = {
                email: this.detail.email,
                password: helpers.randomString(1, 20)
            };
            this.forgotPassword(payload);
        }
    },
    watch: {}
};
export default forgot;
</script>
