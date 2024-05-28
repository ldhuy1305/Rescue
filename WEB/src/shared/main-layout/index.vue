<script>
import template from './template.html';
import Header from '@/shared/header';
import Footer from '@/shared/footer';
import Loading from '@/components/loading';
import ModalMessage from '@/shared/modal-message';
import $ from 'jquery';
export default {
    name: 'MainLayout',
    template: template,
    components: { Header, Footer, Loading, ModalMessage },
    mounted() {
        var totalHeight = 0;
        $('#app').each(function () {
            totalHeight += $(this).outerHeight(true);
        });
        var windowHeight = $(window).height();
        if (totalHeight < windowHeight || $('#app').hasClass('form'))
            $('#contact').css('position', 'fixed');
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
