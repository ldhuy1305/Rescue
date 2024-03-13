<script>
import template from './template.html';
import { mapMutations, mapState } from 'vuex';
var PageNotFound = {
    template: template,
    created() {
        // this.setScreenId(this.screenId);
    },
    data() {
        return {
            screenId: '404'
        };
    },
    computed: {
        ...mapState('app', ['homeScreen'])
    },
    methods: {
        ...mapMutations('app', ['setScreenId'])
    }
};
export default PageNotFound;
</script>
