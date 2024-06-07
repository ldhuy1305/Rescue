<script>
import template from './template.html';
import './style.scss';
// import { mapMutations, mapState, mapActions } from 'vuex';
// import repository from '@/utils/repository';
// import $ from 'jquery';
const User = {
    template: template,
    props: {
        modelValue: Boolean,
        paramSends: Object
    },
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {},
    computed: {
        showModal: {
            get() {
                return this.modelValue;
            },
            set() {}
        }
    },
    methods: {
        close() {
            this.$emit('update:modelValue', false);
            if (this.onClose) {
                this.onClose();
            }
            this.showModal = false;
        }
    }
};
export default User;
</script>
