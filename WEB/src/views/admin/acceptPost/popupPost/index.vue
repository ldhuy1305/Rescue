<script>
import template from './template.html';
import './style.scss';
import messages, { MSG_TYPE, MSG_TITLE } from '@/utils/messages';
import helpers from '@/utils/helpers';
import { mapMutations } from 'vuex';
import moment from 'moment';
import repository from '@/utils/repository';
import '@vuepic/vue-datepicker/dist/main.css';
import VueDatePicker from '@vuepic/vue-datepicker';
const Post = {
    template: template,
    props: {
        showModal: Boolean,
        paramSends: Object,
        onClose: Function
    },
    components: { VueDatePicker },
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            detail: {},
            dateFrom: moment().format('YYYY-MM-DD'),
            dateTo: moment().add(7, 'days').format('YYYY-MM-DD')
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
        validateDate() {
            if (moment(this.dateTo) < moment(this.dateFrom)) {
                helpers.setItemError('dateFrom', messages.E008);
            }
            // eslint-disable-next-line no-undef
            else $(`.item-error`).RemoveError();
        },
        approvePost(is_acp) {
            this.showModalMessage({
                type: MSG_TYPE.CONFIRM,
                title: MSG_TITLE.C999,
                content: is_acp == true ? messages.C004 : messages.C005,
                callback: (ok) => {
                    if (ok) {
                        const dateFrom = moment(this.dateFrom).format(
                            'YYYY-MM-DD'
                        );
                        const dateTo = moment(this.dateTo).format('YYYY-MM-DD');
                        const id = this.paramSends.detail.id;
                        repository
                            .post(
                                `/committee/approval/${id}?accept=${is_acp}&dateFrom=${dateFrom}&dateTo=${dateTo}`
                            )
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
