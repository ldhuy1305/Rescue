<script>
import template from './template.html';

var ServerError = {
    template: template,
    created() {},
    data() {
        return {
            // eslint-disable-next-line no-undef
            img: process.env.VUE_APP_CLOUDINARY + '/common/500'
        };
    },
    computed: {},
    methods: {}
};
export default ServerError;
</script>
