<script>
import store from '@/store';
import template from './template.html';
import './style.scss';
import { mapMutations, mapState, mapActions } from 'vuex';
import formStore from '@/views/form/store';
import Dropdown from '@/components/dropdown';
// import Input from '@components/input';
const form = {
    name: 'Form',
    template: template,
    components: { Dropdown },
    beforeCreate() {
        if (!store.hasModule('form')) {
            store.registerModule('form', formStore);
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
        return {
            huy: 1
        };
    },
    computed: {
        ...mapState('form', ['location', 'detail', 'districts'])
    },
    methods: {
        ...mapMutations('form', ['setWard', 'setDistricts']),
        ...mapActions('form', ['getInitData', 'getDistricts', 'getWards']),
        onFileChanged() {},
        onClick() {},
        setDistricts() {
            this.getDistricts(this.detail.city);
        },
        setWards() {
            this.getWards(this.detail.district);
        }
    }
};
export default form;
</script>
