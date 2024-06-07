<script>
import template from './template.html';
import './style.scss';

import { mapActions, mapMutations, mapState } from 'vuex';
import './style.scss';
import store from '@/store';
import helpers from '@/utils/helpers';
import acceptPostStore from './store';

import Paging from '@/components/pagination';
import SelectBox from '@/components/select';
import PopupPost from './popupPost';
const acceptPost = {
    name: 'acceptPost',
    template: template,
    beforeCreate() {
        if (!store.hasModule('acceptPost')) {
            store.registerModule('acceptPost', acceptPostStore);
        }
    },
    components: { Paging, SelectBox, PopupPost },
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
            showPopup: false
        };
    },
    computed: {
        ...mapState('acceptPost', [
            'listData',
            'conditions',
            'options',
            'paramSends'
        ])
    },
    methods: {
        ...mapMutations('acceptPost', ['setPageAndSize']),
        ...mapActions('acceptPost', ['getInitData', 'getPost']),
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
        showPost(id) {
            this.getPost(id);
            this.showPopup = true;
        },

        onClosePopup() {
            this.getInitData();
            this.showPopup = false;
        }
    },
    watch: {}
};
export default acceptPost;
</script>
