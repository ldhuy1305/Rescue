<script>
import { mapActions, mapMutations, mapState } from 'vuex';

import template from './template.html';
import './style.scss';

import store from '@/store';
import userStore from '@/views/user/store';

const User = {
    name: 'User',
    template: template,
    beforeCreate() {
        if (!store.hasModule('user')) {
            store.registerModule('user', userStore);
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
        ...mapState('app', ['user']),
        ...mapState('user', ['pass'])
    },
    methods: {
        ...mapMutations('app', []),
        ...mapActions('app', []),
        ...mapActions('user', ['save', 'updateAvatar', 'changePassword']),
        // changePassword() {}
        saveAvatar() {
            this.updateAvatar();
        },
        saveData() {
            const payload = {
                firstName: this.user.first_name,
                lastName: this.user.last_name,
                tel: this.user.tel,
                address: this.user.address
            };
            this.save(payload);
        }
    },
    watch: {}
};
export default User;
</script>
