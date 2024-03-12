<script>
import template from './template.html';

import Loading from '@/components/loading';
import MainHeader from '@/shared/header';

export default {
    name: 'MainLayout',
    template: template,
    components: {
        MainHeader,
        Loading
    }
};
</script>
<!-- <style lang="scss">
@import 'handsontable/dist/handsontable.full.css';
@import 'flatpickr/dist/flatpickr.css';
@import 'https://fonts.googleapis.com/earlyaccess/sawarabigothic.css';
</style> -->
