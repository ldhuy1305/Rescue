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
            isFocus: false,
            realMaxLength: undefined
        };
    },
    mounted() {
        this.realMaxLength = this.getRealMaxLength();
    },
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
        getRealMaxLength() {
            if (this.maxLength != undefined && this.maxLength != null)
                return (
                    this.maxLength +
                    (parseInt(this.maxLength / 3) +
                        (this.maxLength % 3 > 0 ? 0 : -1))
                );
        },
        focusInput(e) {
            this.isFocus = true;
            this.realMaxLength = this.maxLength;
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
