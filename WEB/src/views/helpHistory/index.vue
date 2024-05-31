<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import Input from '@/components/input';

import { mapActions, mapMutations, mapState } from 'vuex';
import messages from '@/utils/messages';
import template from './template.html';
import './style.scss';

import store from '@/store';
import helpHistoryStore from '@/views/helpHistory/store';
import moment from 'moment';
import helpers from '@/utils/helpers';
import label from './label';
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

    components: { VueDatePicker, Input },
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
        ...mapState('helpHistory', ['conditions', 'listData'])
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        ...mapActions('app', []),
        ...mapActions('helpHistory', ['getListHelps']),

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
            const date = new Date(dateString);
            return date.toISOString().split('T')[0];
        },
        handleSearch() {
            this.getListHelps();
        }
    }
};
export default helpHistory;
</script>
