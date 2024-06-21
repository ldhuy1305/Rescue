<script>
import template from './template.html';
import './style.scss';

import { mapActions, mapMutations, mapState } from 'vuex';
import './style.scss';
import store from '@/store';
import helpers from '@/utils/helpers';
import managePostStore from './store';
import debounce from 'lodash/debounce';

import Paging from '@/components/pagination';
import SelectBox from '@/components/select';
import PopupHelp from './popupHelp';
import Input from '@/components/input';
const managePost = {
    name: 'managePost',
    template: template,
    beforeCreate() {
        if (!store.hasModule('managePost')) {
            store.registerModule('managePost', managePostStore);
        }
    },
    components: { Paging, SelectBox, PopupHelp, Input },
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
        return { showPopup: false };
    },
    computed: {
        ...mapState('managePost', [
            'listData',
            'conditions',
            'options',
            'paramSends'
        ])
    },
    methods: {
        ...mapMutations('managePost', ['setPageAndSize']),
        ...mapActions('managePost', ['getInitData', 'getListUser', 'export']),
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
        formatDate(date) {
            if (date != null) return helpers.formatDate(date);
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
        isOutDate(dateTo) {
            const now = new Date();
            const toDate = new Date(dateTo);
            return toDate < now;
        },
        showPopupHelp(id) {
            this.getListUser(id);
            this.showPopup = true;
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
export default managePost;
</script>
