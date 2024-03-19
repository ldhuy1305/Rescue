<script>
import template from './template.html';
import Header from '@/shared/header';
import LandingPage from '@/shared/landing-page';
import './style.scss';

const home = {
    name: 'home',
    template: template,
    components: { Header,LandingPage }
};
export default home;
</script>
