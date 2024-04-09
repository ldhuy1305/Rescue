<script>
import template from './template.html';
import './style.scss';
const Header = {
    name: 'Header',
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
                { text: 'Trang', url: '/home' },
                { text: 'About', url: '/about' },
                { text: 'Services', url: '/services' },
                { text: 'Contact', url: '/contact' }
            ]
        };
    },
    computed: {},
    methods: {},
    watch: {}
};
export default Header;
</script>
