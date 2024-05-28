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
        this.startAutoChange();
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
        $('.main-layout').css(
            'background-image',
            `url(${data.backgrounds[this.currentImage]})`
        );
    },

    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            data: data,
            share: data.share,
            currentIndex: 0,
            currentImage: 0
        };
    },
    computed: {},
    methods: {
        startAutoChange() {
            this.autoChangeInterval = setInterval(() => {
                this.changeImage();
            }, 5000);
        },
        viewMore() {
            this.index += 8;
        },
        viewDetail() {},
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
        changeImage() {
            this.currentImage =
                (this.currentImage + 1) % this.data.backgrounds.length;
            $('.main-layout').css(
                'background-image',
                `url(${data.backgrounds[this.currentImage]})`
            );
        }
    },
    watch: {},
    beforeDestroy() {
        clearInterval(this.autoChangeInterval);
    }
};
export default LandingPage;
</script>
