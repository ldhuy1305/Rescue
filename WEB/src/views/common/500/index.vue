<script>
import template from './template.html';
import { mapMutations, mapState } from 'vuex';

var ServerError = {
    template: template,
    created() {
        // this.setScreenId(this.screenId);
    },
    data() {
        return {
            screenId: '500'
        };
    },
    computed: {
        ...mapState('app', ['homeScreen'])
    },
    methods: {
        ...mapMutations('app', ['setScreenId'])
    }
};
export default ServerError;
</script>
