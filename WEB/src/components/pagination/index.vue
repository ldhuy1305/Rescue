<script>
import template from './template.html';

var Pagination = {
    template: template,
    props: {
        id: String,
        itemClass: String,
        size: {
            type: [String, Number],
            default: 10
        },
        total: {
            type: [String, Number],
            default: 0
        },
        page: {
            type: [Number],
            default: 1
        },
        isDisabled: Boolean,
        onChange: Function
    },
    data() {
        return {
            currentPage: this.page,
            perPage: this.size
        };
    },
    mounted() {},
    watch: {
        perPage(val) {
            if (val) {
                this.currentPage = 1;
                this.$emit('changePage', {
                    currentPage: this.currentPage,
                    perPage: parseInt(this.perPage)
                });
            }
        },
        page(val) {
            if (val) {
                this.currentPage = this.page;
            }
        },
        currentPage(val) {
            if (val) {
                this.$emit('changePage', {
                    currentPage: this.currentPage,
                    perPage: parseInt(this.perPage)
                });
            }
        }
    }
};
export default Pagination;
</script>
