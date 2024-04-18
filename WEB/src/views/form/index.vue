<script>
import template from './template.html';
import './style.scss';
import { mapActions } from 'vuex';

const form = {
    name: 'Form',
    template: template,
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {},
    computed: {},
    methods: {
        ...mapActions(['onSave']),
        onFileChanged() {},
        click() {
            this.onSave({});
        }
    },
    watch: {}
};
export default form;
</script>
