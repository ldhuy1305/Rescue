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
        if (totalHeight < windowHeight) $('#contact').css('position', 'fixed');
        else $('#contact').css('position', '');
    },
    watch: {
        $route(to) {
            if (to.name == 'home') {
                $('#contact').css('position', '');
            } else {
                $('#contact').css('position', 'fixed');
            }
        }
    }
};
</script>