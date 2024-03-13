<script>
import template from './template.html';
import { mapState } from 'vuex';
export default {
    name: 'MainLayout',
    template: template,
    computed: {
        ...mapState()
    }
};
</script>
<!-- <style lang="scss">
@import 'handsontable/dist/handsontable.full.css';
@import 'flatpickr/dist/flatpickr.css';
@import 'https://fonts.googleapis.com/earlyaccess/sawarabigothic.css';
</style> -->
