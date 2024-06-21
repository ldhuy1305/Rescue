<script>
import template from './template.html';
import './style.scss';

import { mapActions, mapMutations, mapState } from 'vuex';
import './style.scss';
import store from '@/store';
import helpers from '@/utils/helpers';
import manageHelpStore from './store';
import debounce from 'lodash/debounce';

import Paging from '@/components/pagination';
import SelectBox from '@/components/select';
import Input from '@/components/input';
const manageHelp = {
    name: 'manageHelp',
    template: template,
    beforeCreate() {
        if (!store.hasModule('manageHelp')) {
            store.registerModule('manageHelp', manageHelpStore);
        }
    },
    components: { Paging, SelectBox, Input },
    created() {
        this.getInitData();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {},
    computed: {
        ...mapState('manageHelp', ['listData', 'conditions', 'options'])
    },
    methods: {
        ...mapMutations('manageHelp', ['setPageAndSize']),
        ...mapActions('manageHelp', ['getInitData', 'export']),
        format(value) {
            if (!helpers.isNullOrEmpty(value)) {
                let formattedValue = value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                if (formattedValue.length > 0) {
                    formattedValue += ' đồng';
                }
                return formattedValue;
            }
            return '0 đồng';
        },
        handleSearch() {
            this.changeCurrentPage({
                currentPage: 1,
                perPage: this.listData.pagination.size
            });
        },
        changeCurrentPage(data) {
            this.setPageAndSize(data);
            this.getInitData();
        },
        formatDate(date) {
            return helpers.formatDate(date);
        },
        sort(sortBy) {
            if (this.conditions.sort === sortBy) {
                this.conditions.order =
                    this.conditions.order === 'asc' ? 'desc' : 'asc';
            } else {
                this.conditions.sort = sortBy;
                this.conditions.order = 'asc';
            }
            this.getInitData();
        },
        debouncedSearch: debounce(function () {
            this.getInitData();
        }, 300),
        handleExport() {
            this.export();
        }
    },
    watch: {}
};
export default manageHelp;
</script>
