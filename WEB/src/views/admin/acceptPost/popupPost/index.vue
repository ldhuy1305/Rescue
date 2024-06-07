<script>
import template from './template.html';
import './style.scss';
import messages, { MSG_TYPE, MSG_TITLE } from '@/utils/messages';
import { mapMutations } from 'vuex';
import repository from '@/utils/repository';
const Post = {
    template: template,
    props: {
        modelValue: Boolean,
        paramSends: Object,
        onClose: Function
    },
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            detail: {}
        };
    },
    computed: {
        showModal: {
            get() {
                return this.modelValue;
            },
            set() {}
        }
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        close() {
            this.$emit('update:modelValue', false);
            if (this.onClose) {
                this.onClose();
            }
            this.showModal = false;
        },
        approvePost(is_acp) {
            this.showModalMessage({
                type: MSG_TYPE.CONFIRM,
                title: MSG_TITLE.C999,
                content: is_acp == true ? messages.C004 : messages.C005,
                callback: (ok) => {
                    if (ok) {
                        const id = this.paramSends.detail.id;
                        repository
                        .post(`/committee/approval/${id}?accept=${is_acp}`)
                            .then(() => {
                                this.showModalMessage({
                                    type: MSG_TYPE.SUCCESS,
                                    title: MSG_TITLE.C999,
                                    content:
                                        is_acp == true
                                            ? messages.S002
                                            : messages.S003,
                                    callback: (ok) => {
                                        if (ok) {
                                            this.close();
                                        }
                                    }
                                });
                            });
                    }
                }
            });
        }
    }
};
export default Post;
</script>
