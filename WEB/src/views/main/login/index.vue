<script>
import { mapActions, mapState } from 'vuex';

import template from './template.html';
import './style.scss';

import store from '@/store';
import loginStore from '@/views/main/login/store';
import helpers from '@/utils/helpers';

const login = {
    name: 'Login',
    template: template,
    beforeCreate() {
        if (!store.hasModule('login')) {
            store.registerModule('login', loginStore);
        }
    },
    created() {},
    beforeMount() {},
    mounted() {
        const email = localStorage.getItem('email');
        const password = localStorage.getItem('password');
        if (email && email != '' && password && password != '') {
            this.detail.email = atob(email);
            this.detail.password = atob(password);
        }
        this.$refs.email?.focus();
    },
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            isHidePassword: false,
            type: 'password',
            saveAccount: false
        };
    },
    computed: {
        ...mapState('login', ['detail', 'validRules', 'saveAccount'])
    },
    methods: {
        ...mapActions('login', ['login']),
        saveAccount() {
            this.saveAccount = !this.saveAccount;
        },
        hidePassword() {
            this.isHidePassword = true;
            this.type = 'text';
        },
        unHidePassword() {
            this.isHidePassword = false;
            this.type = 'password';
        },
        checkForm() {
            if (helpers.isValidData(this.detail, this.validRules)) {
                this.login(this.detail);
            }
        }
    },
    watch: {}
};
export default login;
</script>
