<script>
import template from './template.html';
import Header from '@/shared/header';
import LandingPage from '@/shared/landing-page';
import Footer from '@/shared/footer';
import './style.scss';

const home = {
    name: 'home',
    template: template,
    components: { Header, LandingPage, Footer }
};
export default home;
</script>
