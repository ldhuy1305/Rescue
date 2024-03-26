<script>
import template from './template.html';
import './style.scss';
import data from '../../utils/mock_data';
import $ from 'jquery';
const LandingPage = {
    name: 'LandingPage',
    template: template,
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {
        const honorItemWidth = $('.honor-item').first().width();
        $('.content').width(honorItemWidth - 240);
        $('.slide .avatar').each(function () {
            const size =
                $(this).height() > $(this).width()
                    ? $(this).height()
                    : $(this).width();
            $(this).css({
                width: size + 'px',
                height: size + 'px'
            });
        });
    },

    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            data: data,
            share: data.share,
            index: 8,
            currentIndex: 0
        };
    },
    computed: {},
    methods: {
        viewMore() {
            this.index += 8;
        },
        viewDetail() {
            console.log(1);
        },
        preSlide() {
            this.currentIndex =
                (this.currentIndex - 1 + this.data.honor.length) %
                this.data.honor.length;
            // eslint-disable-next-line no-undef
            // $('.slide').css({
            //     // eslint-disable-next-line no-undef
            //     'margin-left': -$('.slide').width() + 'px'
            // });
        },
        nextSlide() {
            this.currentIndex =
                (this.currentIndex + 1) % this.data.honor.length;
        },
        setAva() {}
    },
    watch: {}
};
export default LandingPage;
</script>
