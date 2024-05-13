<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import template from './template.html';
import Input from '@/components/input/index.vue';
import Select from '@/components/select/index.vue';
import './style.scss';

import store from '@/store';
import signupStore from '@/views/main/signup/store';
import helpers from '@/utils/helpers';
const signup = {
    name: 'Signup',
    template: template,
    components: { Input, Select },
    beforeCreate() {
        if (!store.hasModule('signup')) {
            store.registerModule('signup', signupStore);
        }
    },
    created() {
        this.getInitData();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            data: {}
        };
    },
    computed: {
        ...mapState('signup', ['detail', 'validRules', 'location'])
    },
    methods: {
        ...mapMutations('signup', ['setWard', 'setDistricts']),
        ...mapActions('signup', [
            'getInitData',
            'getDistricts',
            'getWards',
            'sendEmail'
        ]),
        setDistricts() {
            this.getDistricts(this.detail.city);
        },
        setWards() {
            this.getWards(this.detail.district);
        },
        signUpUser() {
            if (helpers.isValidData(this.detail, this.validRules)) {
                // this.sendEmail(this.detail);
            }
            this.sendEmail(this.detail);
        }
    },
    watch: {}
};
export default signup;
</script>
