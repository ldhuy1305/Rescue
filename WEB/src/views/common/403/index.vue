<script>
import template from './template.html';
import { mapMutations, mapState } from 'vuex';

var NotAccess = {
    template: template,
    created() {
        // this.setScreenId(this.screenId);
    },
    data() {
        return {
            screenId: '403'
        };
    },
    computed: {
        ...mapState('app', ['homeScreen'])
    },
    methods: {
        ...mapMutations('app', ['setScreenId'])
    }
};
export default NotAccess;
</script>
