<script>
import template from './template.html';
import './style.scss';
import data from '../../utils/mock_data';
const Footer = {
    name: 'Footer',
    template: template,
    beforeCreate() {},
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            links: [
                '/https://www.facebook.com/ldhuy130502',
                '/https://www.facebook.com/ldhuy130502',
                '/https://www.facebook.com/ldhuy130502',
                '/https://www.facebook.com/ldhuy130502',
                '/https://www.facebook.com/ldhuy130502'
            ],

            data: data
        };
    },
    computed: {},
    methods: {},
    watch: {}
};
export default Footer;
</script>
