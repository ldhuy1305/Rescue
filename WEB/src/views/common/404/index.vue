<script>
import template from './template.html';
import '../../../assets/scss/common.scss';
// import { mapMutations, mapState } from 'vuex';
var PageNotFound = {
    template: template,
    created() {},
    data() {
        return {
            // eslint-disable-next-line no-undef
            img: process.env.VUE_APP_CLOUDINARY + '/common/404'
        };
    },
    computed: {},
    methods: {}
};
export default PageNotFound;
</script>
