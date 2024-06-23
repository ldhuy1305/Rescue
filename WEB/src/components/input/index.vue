<!-- eslint-disable prettier/prettier -->
<script>
import template from './template.html';

var Input = {
    template: template,
    props: {
        id: String,
        label: String,
        style: String,
        itemClass: String,
        buttonClass: String,
        labelClass: String,
        labelBefore: String,
        labelAfter: String,
        inputClass: String,
        placeholder: String,
        value: String,
        modelValue: String | Number,
        isRequired: Boolean,
        isDisabled: Boolean,
        isDisabledIcon: Boolean,
        isReadonly: Boolean,
        type: String,
        maxLength: Number,
        cols: Number,
        rows: Number,
        isInputGroup: Boolean,
        onChange: Function,
        onFocus: Function,
        onBlur: Function,
        onClick: Function
    },
    emits: ['update:modelValue'],
    data() {
        return {
            isFocus: false
        };
    },
    mounted() {},
    computed: {
        vewValue: {
            get() {
                const val = this.modelValue ? this.modelValue : this.value;
                return val;
            },
            set() {}
        }
    },
    methods: {
        focusInput(e) {
            this.isFocus = true;
            if (this.onFocus) {
                this.onFocus(e);
            }
        },
        focusItem() {
            this.$refs.input.focus();
        },
        updateInput(e) {
            const value = this.$refs.input.value;
            this.$emit('update:modelValue', value);
            if (this.onChange) {
                this.onChange(e, value);
            }
        }
    }
};
export default Input;
</script>
