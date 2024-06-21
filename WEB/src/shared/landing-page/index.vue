<script>
import template from './template.html';
import './style.scss';
import data from '../../utils/mock_data';
import $ from 'jquery';
import repository from '@/utils/repository';
import helpers from '@/utils/helpers';
import messages, { MSG_TITLE, MSG_TYPE } from '@/utils/messages';
const LandingPage = {
    name: 'LandingPage',
    template: template,
    beforeCreate() {},
    created() {
        this.getInitData();
    },
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
            currentImage: 0,
            news: []
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
        },
        goToPage(id) {
            this.$router.push({
                name: 'post',
                query: {
                    p: helpers.encodeParams(id)
                }
            });
        },
        async helpRandom() {
            return repository.get('/help/random').then((res) => {
                if (res.data.Data.id) this.goToPage(res.data.Data.id);
                else
                    this.showModalMessage({
                        type: MSG_TYPE.WARNING,
                        title: MSG_TITLE.C999,
                        content: messages.W001
                    });
            });
        },
        getInitData() {
            const payload = {
                keyword: '',
                city: '0',
                district: '0',
                ward: '0',
                size: 4,
                page: 1,
                is_all: true
            };
            return repository
                .get('/approval', { params: payload })
                .then((res) => {
                    console.log(res.data.Data);
                    this.news = res.data.Data.list;
                });
        }
    },
    watch: {},
    beforeDestroy() {
        clearInterval(this.autoChangeInterval);
    }
};
export default LandingPage;
</script>
