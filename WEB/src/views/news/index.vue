<script>
import { mapActions, mapMutations, mapState } from 'vuex';
// import messages, { MSG_TITLE, MSG_TYPE } from '@/utils/messages';
import template from './template.html';
import './style.scss';

import store from '@/store';
import newsStore from '@/views/news/store';
// import helpers from '@/utils/helpers';

import Paging from '@/components/pagination';
const News = {
    name: 'News',
    template: template,
    components: { Paging },
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
        return {};
    },
    computed: {
        ...mapState('news', ['listData'])
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        ...mapActions('app', []),
        ...mapActions('news', ['save', 'getInitData'])
    },
    watch: {
    }
};
export default News;
</script>
