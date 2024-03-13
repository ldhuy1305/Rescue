<!-- eslint-disable prettier/prettier -->
<script>
import _ from 'lodash-uuid';

import template from './template.html';

var AnsInput = {
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
        isMobile: {
            type: Boolean,
            default: false
        },
        type: String,
        isDecimal: {
            type: Boolean,
            default: false
        },
        decimal: Number,
        isNegative: Boolean,
        maxLength: Number,
        cols: Number,
        rows: Number,
        icon: String,
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
            newId: _.uuid(),
            realMaxLength: undefined
        };
    },
    mounted() {
        if (this.id && this.id != '') {
            this.newId = this.id;
        }
        this.realMaxLength = this.getRealMaxLength();
    },
    computed: {
        vewValue: {
            get() {
                const val = this.convertNumber(
                    this.modelValue ? this.modelValue : this.value
                );
                if (this.isFocus && !this.isDisabled && !this.isReadonly) {
                    // eslint-disable-next-line prettier/prettier
                    return this.type == 'money' ? val.replace(/,/g, '') : this.type == 'postcode' ? val.replace(/-/g, '') : val;
                }
                return val;
            },
            set() {}
        }
    },
    methods: {
        /**
         * convert number type for input
         * -----------------------------------------
         * @author : QuyPN - 2023/03/28 - create
         * @params :
         * @access : private
         */
        convertNumber(value) {
            if (value == undefined || value == '' || value == null) {
                return '';
            }
            value = value + '';
            let values = [];
            let negative = '';
            let dot = '';
            let afterDot = '';
            if (this.type == 'number' || this.type == 'money') {
                if (this.isNegative && value.startWith('-')) {
                    negative = '-';
                    value = value.substring(1, value.length - 1);
                }
                values = value.split('.');
                values[0] = values[0].replace(/\D/g, '');
                if (values.length > 1) {
                    afterDot = values[1].replace(/\D/g, '');
                    if (afterDot.length > this.decimal) {
                        afterDot = afterDot.substring(0, this.decimal);
                    }
                    dot = '.';
                }
                if (this.type == 'money') {
                    values[0] = values[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
                }
                if (
                    this.isDecimal &&
                    this.decimal > 0 &&
                    afterDot === '' &&
                    value.length > this.maxLength - this.decimal
                ) {
                    dot = '.';
                    afterDot = values[0].substring(
                        this.maxLength - this.decimal,
                        value.length
                    );
                    values[0] = values[0].substring(
                        0,
                        this.maxLength - this.decimal
                    );
                }
                if (!values[0]) {
                    values[0] = 0;
                }
                // if (this.isDecimal && this.decimal > 0) {
                //     values[0] = parseFloat(value);
                //     // values = parseFloat(values).toFixed(1);
                //     dot = '.';
                //     afterDot =
                //         afterDot > 0 ? afterDot.substring(0, this.decimal) : 0;
                // }
                this.isDecimal
                    ? (value = negative + values[0] + dot + afterDot)
                    : (value = negative + values[0]);
            }
            if (this.type == 'postcode') {
                const postcode = value.replace(/\D/g, '');
                if (postcode.length >= 7) {
                    value = postcode.slice(0, 3) + '-' + postcode.slice(3, 7);
                } else {
                    value = '';
                }
            }
            return value;
        },
        /**
         * get max lenght input
         * -----------------------------------------
         * @author : QuyPN - 2023/03/28 - create
         * @params :
         * @access : private
         */
        getRealMaxLength(e) {
            if (
                this.maxLength == undefined ||
                this.maxLength == null ||
                this.type != 'money'
            ) {
                let maxLength = this.maxLength;
                if (e) {
                    if (this.type == 'number') {
                        if (e.target.value.indexOf('-') >= 0) {
                            maxLength += 1;
                        }
                        if (e.target.value.indexOf('.') >= 0) {
                            maxLength += 1;
                        }
                    }
                    if (this.type == 'postcode') {
                        if (e.target.value.indexOf('-') >= 0) {
                            maxLength += 1;
                        }
                    }
                }
                return maxLength;
            }
            return (
                this.maxLength +
                (parseInt(this.maxLength / 3) +
                    (this.maxLength % 3 > 0 ? 0 : -1))
            );
        },
        /**
         * event forcus on input
         * -----------------------------------------
         * @author : QuyPN - 2023/03/28 - create
         * @params :
         * @access : private
         */
        focusInput(e) {
            //e.target.select();
            this.isFocus = true;
            this.realMaxLength = this.maxLength;
            if (this.onFocus) {
                this.onFocus(e);
            }
        },
        focusItem() {
            this.$refs.input.focus();
        },
        /**
         * event blur on input
         * -----------------------------------------
         * @author : QuyPN - 2023/03/28 - create
         * @params :
         * @access : private
         */
        blurInput(e) {
            this.isFocus = false;
            this.realMaxLength = this.getRealMaxLength(e);
            if (this.onBlur) {
                this.onBlur(e);
            }
        },
        /**
         * event keydown on input
         * -----------------------------------------
         * @author : QuyPN - 2023/03/28 - create
         * @params :
         * @access : private
         */
        inputKeydown(e) {
            if (this.type == 'number' && this.isDecimal) {
                return this.inputOnlyDecimal(e);
            }
            if (
                this.type == 'number' ||
                this.type == 'money' ||
                this.type == 'postcode'
            ) {
                return this.inputOnlyNumber(e);
            }
            if (this.type == 'tel') {
                return this.inputOnlyTel(e);
            }
        },
        inputKeyup(e) {
            let maxLength = this.maxLength;
            if (this.type == 'number') {
                if (e.target.value.indexOf('-') >= 0) {
                    maxLength += 1;
                }
                if (e.target.value.indexOf('.') >= 0) {
                    maxLength += 1;
                }
            }
            if (this.type == 'postcode') {
                if (e.target.value.indexOf('-') >= 0) {
                    maxLength += 1;
                }
            }
            this.realMaxLength = maxLength;
            if (
                this.type == 'postcode' &&
                this.realMaxLength != e.target.value.length
            ) {
                return false;
            }
            this.$emit('update:modelValue', e.target.value);
            return true;
        },
        /**
         * event block key on input
         * -----------------------------------------
         * @author : QuyPN - 2023/03/28 - create
         * @params :
         * @access : private
         */
        inputOnlyNumber(e) {
            if (
                !(
                    (e.keyCode > 47 && e.keyCode < 58) ||
                    (e.keyCode > 95 && e.keyCode < 106) ||
                    e.keyCode == 116 ||
                    e.keyCode == 46 ||
                    e.keyCode == 37 ||
                    e.keyCode == 39 ||
                    e.keyCode == 35 ||
                    e.keyCode == 36 ||
                    e.keyCode == 8 ||
                    e.keyCode == 9 ||
                    e.ctrlKey ||
                    e.keyCode == 229 ||
                    e.keyCode == 13
                ) ||
                (!this.isNegative && e.keyCode == 189) ||
                e.keyCode == 109
            ) {
                event.preventDefault();
                return false;
            }
            return true;
        },
        /**
         * event block key on input
         * -----------------------------------------
         * @author : Quanhvm - 2023/03/15 - create
         * @params :
         * @access : private
         */
        inputOnlyDecimal(e) {
            if (
                !(
                    (e.keyCode > 47 && e.keyCode < 58) ||
                    (e.keyCode > 95 && e.keyCode < 106) ||
                    e.keyCode == 116 ||
                    e.keyCode == 46 ||
                    e.keyCode == 37 ||
                    e.keyCode == 39 ||
                    e.keyCode == 35 ||
                    e.keyCode == 36 ||
                    e.keyCode == 8 ||
                    e.keyCode == 9 ||
                    e.ctrlKey ||
                    e.keyCode == 229 ||
                    e.keyCode == 110 ||
                    e.keyCode == 190 ||
                    e.keyCode == 13
                ) ||
                (!this.isNegative && e.keyCode == 189) ||
                e.keyCode == 109
            ) {
                event.preventDefault();
                return false;
            }
            return true;
        },
        /**
         * event block key on input with type tel
         * -----------------------------------------
         * @author : QuanHVM - 2022/05/11 - create
         * @params :
         * @access : private
         */
        inputOnlyTel(e) {
            if (
                !(
                    (!e.shiftKey && e.keyCode > 47 && e.keyCode < 58) ||
                    (!e.shiftKey && e.keyCode > 95 && e.keyCode < 106) ||
                    e.keyCode == 116 ||
                    e.keyCode == 46 ||
                    e.keyCode == 37 ||
                    e.keyCode == 39 ||
                    e.keyCode == 35 ||
                    e.keyCode == 36 ||
                    e.keyCode == 8 ||
                    e.keyCode == 9 ||
                    e.ctrlKey ||
                    e.keyCode == 229 ||
                    e.keyCode == 107 ||
                    e.keyCode == 109 ||
                    (!e.shiftKey && e.keyCode == 189) ||
                    (e.shiftKey && e.keyCode == 57) ||
                    (e.shiftKey && e.keyCode == 48) ||
                    (e.shiftKey && e.keyCode == 187)
                )
            ) {
                event.preventDefault();
                return false;
            }
            return true;
        },
        /**
         * update input
         * -----------------------------------------
         * @author : QuyPN - 2023/03/28 - create
         * @params :
         * @access : private
         */
        updateInput(e) {
            const val = this.convertNumber(this.$refs.input.value);
            const value =
                this.type == 'money'
                    ? val.replace(/,/g, '')
                    : this.type == 'katakana'
                        ? val.replace(/[^ァ-ンーｧ-ﾝﾞﾟ0-9]/gi, '')
                        : val;
            this.$emit('update:modelValue', value);
            if (this.onChange) {
                this.onChange(e, value);
            }
        }
    }
};
export default AnsInput;
</script>
