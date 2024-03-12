<script>
/**
 * ****************************************************************************
 * @description     :   Component for show layout loading
 * @created at      :   2022/03/24
 * @created by      :   ANS809 – quypn@ans-asia.com
 * @package         :   STworks
 * @copyright       :   Copyright (c) A.N.S Asia
 * @version         :   1.0.0
 * ****************************************************************************
 */

/**
 * Import libraries
 */
import { mapState } from 'vuex';

/**
 * Import template
 */
import template from './template.html';

/**
 * Define component chat for show page chat
 */
var Loading = {
    template: template,
    computed: {
        ...mapState('app', ['isLoading', 'isForceLoading', 'isNoLoading'])
    }
};
export default Loading;
</script>
