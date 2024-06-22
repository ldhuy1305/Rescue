<script>
import template from './template.html';
import './style.scss';
// import { mapMutations, mapState, mapActions } from 'vuex';
// import repository from '@/utils/repository';
// import $ from 'jquery';
const User = {
    template: template,
    props: {
        showModal: Boolean,
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
    },
    methods: {
        close() {
            if (this.onClose) {
                this.onClose();
            }
        }
    }
};
export default User;
</script>
