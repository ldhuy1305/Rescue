<script>
import template from './template.html';
import Header from '@/shared/header';
import Footer from '@/shared/footer';
import $ from 'jquery';
export default {
    name: 'MainLayout',
    template: template,
    components: { Header, Footer },
    mounted() {
        var totalHeight = 0;
        $('#app').each(function () {
            totalHeight += $(this).outerHeight(true);
        });
        var windowHeight = $(window).height();
        if (totalHeight > windowHeight) {
            if ($('#landing-page').length > 0)
                $('#contact').css('position', 'sticky');
        } else $('#contact').css('position', 'fixed');
    },
    watch: {
        $route(to) {
            if (to.name == 'home') {
                $('#contact').css('position', 'sticky');
            }
        }
    }
};
</script>
<!-- <style lang="scss">
@import 'handsontable/dist/handsontable.full.css';
@import 'flatpickr/dist/flatpickr.css';
@import 'https://fonts.googleapis.com/earlyaccess/sawarabigothic.css';
</style> -->
