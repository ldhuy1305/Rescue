<script>
import template from './template.html';
import './style.scss';

const login = {
    name: 'Login',
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
                { text: 'Home', url: '/' },
                { text: 'About', url: '/about' },
                { text: 'Services', url: '/services' },
                { text: 'Contact', url: '/contact' }
            ],
            isHidePassword: false,
            type: 'password'
        };
    },
    computed: {},
    methods: {
        hidePassword() {
            this.isHidePassword = true;
            this.type = 'text';
        },
        unHidePassword() {
            this.isHidePassword = false;
            this.type = 'password';
        }
    },
    watch: {}
};
export default login;
</script>
