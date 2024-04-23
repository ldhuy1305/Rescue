<script>
import store from '@/store';
import template from './template.html';
import './style.scss';
import { mapMutations, mapState } from 'vuex';
import formStore from '@/views/form/store';
import Dropdown from '@/components/dropdown';
const form = {
    name: 'Form',
    template: template,
    components: { Dropdown },
    beforeCreate() {
        if (!store.hasModule('form')) {
            store.registerModule('form', formStore);
        }
    },
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {},
    computed: { ...mapState('form', ['detail', 'wards', 'districts']) },
    methods: {
        ...mapMutations('form', ['setWard']),
        // ...mapActions(['onSave']),
        onFileChanged() {},
        onClick() {
            // this.onSave({});
            console.log(this.detail);
        },
        setWard() {}
    }
};
export default form;
</script>
