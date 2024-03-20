<script>
import template from './template.html';
import './style.scss';
import data from '../../utils/mock_data';
const LandingPage = {
    name: 'LandingPage',
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
            data: data,
            share: data.share,
            index: 8
        };
    },
    computed: {},
    methods: {
        viewMore() {
            this.index += 8;
        },
        viewDetail() {
            console.log(1);
        }
    },
    watch: {}
};
export default LandingPage;
</script>
