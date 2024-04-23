<script>
import template from './template.html';

/**
 * Define content of select component
 */
var Dropdown = {
    template: template,
    props: {
        id: String,
        label: String,
        itemClass: String,
        labelClass: String,
        selectedClass: String,
        emptyText: String,
        isRequired: Boolean,
        isDisabled: Boolean,
        isReadonly: Boolean,
        options: Array,
        onChangeEvent: Function,
        onFocus: Function,
        onBlur: Function
    },
    emits: ['update:modelValue'],
    data() {
        return {};
    },
    mounted() {},
    computed: {
        vewValue() {
            const val = this.modelValue ? this.modelValue : this.value;
            console.log(val);
            return val;
        }
    },
    methods: {
        focusInput(e) {
            if (this.onFocus) {
                this.onFocus(e);
            }
        },
        blurInput(e) {
            if (this.onBlur) {
                this.onBlur(e);
            }
        },
        updateInput(e) {
            const oldValue = this.vewValue;
            const newValue = this.$refs.select.value;
            if ((this.vewValue ?? '') != (newValue ?? '')) {
                this.$emit('update:modelValue', newValue);
                if (this.onChangeEvent) {
                    this.onChangeEvent(e, newValue, oldValue);
                }
            }
        }
    }
};
export default Dropdown;
</script>
