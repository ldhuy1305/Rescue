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
        this.updateFooterPosition();
        this.observer = new MutationObserver(this.updateFooterPosition);
        const config = { attributes: true, childList: true, subtree: true };
        this.observer.observe(document.getElementById('app'), config);
    },
    updated() {
        this.updateFooterPosition();
    },
    watch: {
        $route(to) {
            if (to.name == 'home') {
                $('#contact').css('position', '');
            } else {
                $('#contact').css('position', 'fixed');
            }
        }
    },
    methods: {
        updateFooterPosition() {
            var windowHeight = $(window).height();
            if (
                $('#header').siblings().outerHeight(true) +
                    $('#contact').height() <
                    windowHeight ||
                $('#app').hasClass('form')
            ) {
                $('#contact').css('position', 'fixed');
            } else {
                $('#contact').css('position', '');
            }
        }
    }
};
</script>
