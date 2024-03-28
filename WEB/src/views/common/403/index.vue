<script>
import template from './template.html';

var NotAccess = {
    template: template,
    created() {},
    data() {
        return {
            // eslint-disable-next-line no-undef
            img: process.env.VUE_APP_CLOUDINARY + '/common/403'
        };
    },
    computed: {},
    methods: {}
};
export default NotAccess;
</script>
