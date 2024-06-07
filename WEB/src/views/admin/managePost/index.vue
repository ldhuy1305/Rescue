<script>
import template from './template.html';
import './style.scss';

import { mapActions, mapMutations, mapState } from 'vuex';
import './style.scss';
import store from '@/store';
import helpers from '@/utils/helpers';
import managePostStore from './store';

import Paging from '@/components/pagination';
import SelectBox from '@/components/select';
import PopupHelp from './popupHelp';
const managePost = {
    name: 'managePost',
    template: template,
    beforeCreate() {
        if (!store.hasModule('managePost')) {
            store.registerModule('managePost', managePostStore);
        }
    },
    components: { Paging, SelectBox, PopupHelp },
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
        ...mapActions('managePost', ['getInitData', 'getListUser']),
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
            console.log(1);
            this.getListUser(id);
            this.showPopup = true;
        }
    },
    watch: {}
};
export default managePost;
</script>
