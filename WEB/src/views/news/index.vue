<script>
import { mapActions, mapMutations, mapState } from 'vuex';
import messages from '@/utils/messages';
import template from './template.html';
import './style.scss';
import label from './label';

import store from '@/store';
import newsStore from '@/views/news/store';
import helpers from '@/utils/helpers';
import moment from 'moment';

import Paging from '@/components/pagination';
import Input from '@/components/input';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Select from '@/components/select'
const News = {
    name: 'News',
    template: template,
    components: { Paging, Input, Select, VueDatePicker },
    beforeCreate() {
        if (!store.hasModule('news')) {
            store.registerModule('news', newsStore);
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
        return { label: label };
    },
    computed: {
        ...mapState('news', ['listData', 'conditions', 'location'])
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        ...mapActions('app', []),
        ...mapActions('news', [
            'save',
            'getInitData',
            'getDistricts',
            'getWards'
        ]),
        readMore(news) {
            this.$router.push({
                name: 'post',
                query: {
                    p: helpers.encodeParams(news.id)
                }
            });
        },
        validateDate() {
            if (
                moment(this.conditions.dateTo) <
                moment(this.conditions.dateFrom)
            ) {
                helpers.setItemError('dateFrom', messages.E008);
            }
            // eslint-disable-next-line no-undef
            else $(`.item-error`).RemoveError();
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        },
        handleSearch() {
            this.getInitData();
        }
    },
    watch: {}
};
export default News;
</script>
