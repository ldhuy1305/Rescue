<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import moment from 'moment';

import { mapActions, mapMutations, mapState } from 'vuex';
import messages from '@/utils/messages';
import template from './template.html';
import './style.scss';
import store from '@/store';
import helpers from '@/utils/helpers';
import label from './label';
import helpHistoryStore from '@/views/helpHistory/store';

import Paging from '@/components/pagination';
import RvnInput from '@/components/input';
import RvnSelect from '@/components/select';
const helpHistory = {
    name: 'helpHistory',
    template: template,
    beforeCreate() {
        if (!store.hasModule('helpHistory')) {
            store.registerModule('helpHistory', helpHistoryStore);
        }
    },
    created() {
        this.getListHelps();
    },

    components: { VueDatePicker, RvnInput, Paging, RvnSelect },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return { date: null, label: label };
    },
    computed: {
        ...mapState('app', ['user']),
        ...mapState('helpHistory', ['conditions', 'listData', 'options'])
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        ...mapActions('app', []),
        ...mapActions('helpHistory', ['getListHelps']),
        ...mapMutations('helpHistory', ['setPageAndSize']),
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
        goToPost(id) {
            this.$router.push({
                name: 'post',
                query: {
                    p: helpers.encodeParams(id)
                }
            });
        },
        format(value) {
            let formattedValue = value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            if (formattedValue.length > 0) {
                formattedValue += ' đồng';
            }
            return formattedValue;
        },
        formatDate(dateString) {
            return moment(dateString).utc().format('YYYY-MM-DD HH:mm:ss');
        },
        handleSearch() {
            this.changeCurrentPage({
                currentPage: 1,
                perPage: this.listData.pagination.size
            });
        },
        changeCurrentPage(data) {
            if (!helpers.isError()) {
                this.setPageAndSize(data);
                this.getListHelps();
            }
        },
        changePerPage() {
            this.changeCurrentPage({
                currentPage: 1,
                perPage: this.listData.pagination.size
            });
        },
        sort(sortBy) {
            if (this.conditions.sort === sortBy) {
                this.conditions.order =
                    this.conditions.order === 'asc' ? 'desc' : 'asc';
            } else {
                this.conditions.sort = sortBy;
                this.conditions.order = 'asc';
            }
            this.getListHelps();
        }
    }
};
export default helpHistory;
</script>
