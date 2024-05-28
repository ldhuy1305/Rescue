<script>
import template from './template.html';
import './style.scss';
// import store from '@/store';
import { mapActions, mapState, mapMutations } from 'vuex';
const Header = {
    name: 'Header',
    template: template,
    beforeCreate() {},
    created() {
        if (localStorage.getItem('token')) {
            this.getUser();
            this.isUser = true;
        }
    },
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
            ],
            dropdownVisible: false,
            isUser: false
        };
    },
    computed: {
        ...mapState('app', ['user'])
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        logout() {
            this.isUser = false;
            localStorage.removeItem('token');
            localStorage.removeItem('tokenTimeout');
            this.setUser({});
            this.$router.push('/home');
        },
        goToProfile() {
            this.$router.push('/user');
        },
        ...mapActions('app', ['getUser']),
        ...mapMutations('app', ['setUser'])
    },
    watch: {}
};
export default Header;
</script>
