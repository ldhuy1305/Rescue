<script>
import { mapState, mapMutations } from 'vuex';

import { MSG_TYPE } from '@/utils/messages';

import template from './template.html';

const ModalMessage = {
    name: 'ModalMessage',
    template: template,
    computed: {
        ...mapState('app', ['modalMessage', 'isShowModalMessage']),
        showModal: {
            get() {
                return this.isShowModalMessage;
            },
            set(value) {
                console.log(value);
                this.updateShowModalMessage(value);
            }
        },
        showCancel() {
            return (
                this.modalMessage.type == MSG_TYPE.CONFIRM ||
                this.modalMessage.type == MSG_TYPE.WARNING
            );
        },
        showTitle() {
            return this.modalMessage.title && this.modalMessage.title != '';
        }
    },
    methods: {
        ...mapMutations('app', ['hideModalMessage', 'updateShowModalMessage']),
        onClickOk() {
            const callback = this.modalMessage.callback;
            this.hideModalMessage();
            if (callback) {
                setTimeout(() => {
                    callback(true);
                }, 300);
            }
        },
        onClickCancel() {
            const callback = this.modalMessage.callback;
            this.hideModalMessage();
            if (callback) {
                setTimeout(() => {
                    callback(false);
                }, 300);
            }
        }
    }
};
export default ModalMessage;
</script>
