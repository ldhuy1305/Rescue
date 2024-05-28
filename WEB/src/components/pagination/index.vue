<script>
import template from './template.html';

var Pagination = {
    template: template,
    props: {
        id: String,
        itemClass: String,
        modelValue: {
            type: Object,
            default: {
                totalRecord: 0,
                record: '',
                page: 1,
                maxpage: 1
            }
        },
        isDisabled: Boolean,
        onChange: Function
    },
    emits: ['update:modelValue'],
    computed: {
        paging() {
            return {
                totalRecord: parseInt(`${this.modelValue.totalRecord ?? 0}`),
                record: this.modelValue.record ?? '',
                page: parseInt(`${this.modelValue.page ?? 1}`),
                maxpage: parseInt(`${this.modelValue.maxpage ?? 1}`)
            };
        },
        canNext() {
            return (this.paging.page ?? 1) < (this.paging.maxpage ?? 1);
        },
        canPrev() {
            return (this.paging.page ?? 1) > 1;
        }
    },
    data() {},
    mounted() {
    },
    methods: {
        updateInput(step) {
            this.paging.page = (this.paging.page ?? 1) + step;
            if (this.paging.page < 1) {
                this.paging.page = 1;
            }
            if (this.paging.page > (this.paging.maxpage ?? 1)) {
                this.paging.page = this.paging.maxpage ?? 1;
            }
            this.$emit('update:modelValue', this.paging);
            if (this.onChange) {
                this.onChange(this.paging.page, this.paging);
            }
        }
    }
};
export default Pagination;
</script>
