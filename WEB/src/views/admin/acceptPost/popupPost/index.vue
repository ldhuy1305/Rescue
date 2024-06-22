<script>
import template from './template.html';
import './style.scss';
import messages, { MSG_TYPE, MSG_TITLE } from '@/utils/messages';
import { mapMutations } from 'vuex';
import repository from '@/utils/repository';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const Post = {
    template: template,
    props: {
        showModal: Boolean,
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
        formattedContent() {
            const parser = new DOMParser();
            const decodedString = parser.parseFromString(
                this.paramSends.detail?.content,
                'text/html'
            ).body.textContent;
            return decodedString;
        }
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        close() {
            if (this.onClose) {
                this.onClose();
            }
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
