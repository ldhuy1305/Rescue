<script>
import template from './template.html';
import Header from '@/shared/header';
import Footer from '@/shared/footer';
import './style.scss';

const post = {
    name: 'post',
    template: template,
    components: { Header, Footer }
};
export default post;
</script>
