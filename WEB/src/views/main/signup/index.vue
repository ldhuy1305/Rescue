<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import template from './template.html';
import RvnInput from '@/components/input/index.vue';
import RvnSelect from '@/components/select/index.vue';
import messages from '@/utils/messages';
import './style.scss';

import store from '@/store';
import signupStore from '@/views/main/signup/store';
import helpers from '@/utils/helpers';
const signup = {
    name: 'Signup',
    template: template,
    components: { RvnInput, RvnSelect },
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
            if (this.detail.password != this.detail.confirmPassword) {
                helpers.setItemError('confirmPassword', messages.E007);
                return;
            }
            if (!helpers.isValidData(this.detail, this.validRules)) {
                return;
            }

            let wardName = helpers.findObjectInArrayByKey(
                this.location.wards,
                'code',
                this.detail.ward
            ).name;
            let districtName = helpers.findObjectInArrayByKey(
                this.location.districts,
                'code',
                this.detail.district
            ).name;
            let cityName = helpers.findObjectInArrayByKey(
                this.location.cities,
                'code',
                this.detail.city
            ).name;
            const payload = {
                email: this.detail.email,
                password: this.detail.password,
                firstName: encodeURI(this.detail.firstName),
                lastName: encodeURI(this.detail.lastName),
                phoneNumber: this.detail.phoneNumber,
                address: encodeURI(
                    `${this.detail.address}, ${wardName} , ${districtName}, ${cityName}`
                )
            };
            this.sendEmail(payload);
        }
    },
    watch: {}
};
export default signup;
</script>
