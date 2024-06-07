<script>
import template from './template.html';
import './style.scss';

import { mapActions, mapMutations, mapState } from 'vuex';
import './style.scss';
import store from '@/store';
import manageUserStore from '@/views/admin/manageUser/store';

import Paging from '@/components/pagination';
import SelectBox from '@/components/select';
import PopupUser from './popupUser';
const manageUser = {
    name: 'manageUser',
    template: template,
    beforeCreate() {
        if (!store.hasModule('manageUser')) {
            store.registerModule('manageUser', manageUserStore);
        }
    },
    components: { Paging, SelectBox, PopupUser },
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
        return {
            showPopup: false,
            paramSends: {}
        };
    },
    computed: {
        ...mapState('manageUser', ['listData', 'conditions', 'options'])
    },
    methods: {
        ...mapMutations('manageUser', ['setPageAndSize']),
        ...mapActions('manageUser', ['getInitData']),
        format(value) {
            let formattedValue = value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            if (formattedValue.length > 0) {
                formattedValue += ' đồng';
            }
            return formattedValue;
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
        showPopupUser(item) {
            this.paramSends = {
                name: item.last_name + ' ' + item.first_name,
                phoneNumber: item.tel,
                email: item.email,
                avatar: item.avatar,
                address: item.address
            };
            this.showPopup = true;
        }
    },
    watch: {}
};
export default manageUser;
</script>
