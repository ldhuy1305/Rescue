<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import messages, { MSG_TITLE, MSG_TYPE } from '@/utils/messages';
import template from './template.html';
import './style.scss';

import store from '@/store';
import userStore from '@/views/user/store';
import helpers from '@/utils/helpers';

const User = {
    name: 'User',
    template: template,
    beforeCreate() {
        if (!store.hasModule('user')) {
            store.registerModule('user', userStore);
        }
    },
    created() {
        // this.initializeUserData();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            userData: {},
            avatar: null
        };
    },
    computed: {
        ...mapState('app', ['user']),
        ...mapState('user', ['pass', 'validRules1', 'validRules2'])
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        ...mapActions('app', []),
        ...mapActions('user', ['save', 'updateAvatar', 'changePass']),
        changePassword() {
            if (!helpers.isValidData(this.pass, this.validRules2)) {
                return;
            }
            if (this.pass.newPass != this.pass.confirmedPass) {
                helpers.setItemError('confirmedPass', messages.E007);
                return;
            }
            this.showModalMessage({
                type: MSG_TYPE.CONFIRM,
                title: MSG_TITLE.C999,
                content: messages.C003,
                callback: (ok) => {
                    if (ok) {
                        this.changePass();
                    }
                }
            });
        },
        saveAvatar() {
            if (this.avatar) {
                const formData = new FormData();
                formData.append('avatar', this.avatar);
                this.updateAvatar(formData);
            }
        },
        saveData() {
            const payload = {
                firstName: this.userData.first_name,
                lastName: this.userData.last_name,
                phoneNumber: this.userData.tel,
                address: this.userData.address
            };
            if (!helpers.isValidData(payload, this.validRules1)) {
                return;
            }
            this.showModalMessage({
                type: MSG_TYPE.CONFIRM,
                title: MSG_TITLE.C999,
                content: messages.C002,
                callback: (ok) => {
                    if (ok) {
                        this.save(payload);
                    }
                }
            });
        },
        createUserCopy() {
            return { ...this.user };
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.userData.avatar = e.target.result;
                };
                reader.readAsDataURL(file);
                this.avatar = file;
            }
        }
    },
    watch: {
        user: {
            handler(newVal) {
                if (newVal && Object.keys(newVal).length) {
                    this.userData = this.createUserCopy();
                }
            },
            immediate: true
        }
    }
};
export default User;
</script>
