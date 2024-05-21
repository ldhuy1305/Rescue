<script>
import template from './template.html';
import './style.scss';
// import store from '@/store';
import { mapActions, mapState } from 'vuex';
const Header = {
    name: 'Header',
    template: template,
    beforeCreate() {},
    created() {
        if (sessionStorage.getItem('token')) {
            this.getUser();
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
            dropdownVisible: false
        };
    },
    computed: {
        ...mapState('app', ['user'])
        // isAuthenticated() {
        //     if (sessionStorage.getItem('token')) {
        //         this.getUser();
        //         // console.log(this.user);
        //     }
        //     return !!sessionStorage.getItem('token');
        // }
    },
    methods: {
        toggleDropdown() {
            this.dropdownVisible = !this.dropdownVisible;
        },
        logout() {
            console.log(1);
            sessionStorage.removeItem('token');
            this.$router.push('/home');
        },
        ...mapActions('app', ['getUser'])
    },
    watch: {}
};
export default Header;
</script>
