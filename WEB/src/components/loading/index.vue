<script>
import { mapState } from 'vuex';

import template from './template.html';

var Loading = {
    template: template,
    computed: {
        ...mapState('app', ['isLoading', 'isForceLoading', 'isNoLoading'])
    }
};
export default Loading;
</script>
