<script>
import template from './template.html';
import './style.scss';
import { mapMutations, mapState, mapActions } from 'vuex';
import repository from '@/utils/repository';
import $ from 'jquery';
const Amount = {
    template: template,
    props: {
        modelValue: Boolean,
        paramSends: Object
    },
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            selectedValue: null,
            otherAmount: '',
            options: [
                { value: 60 },
                { value: 110 },
                { value: 150 },
                { value: 200 },
                { value: 500 },
                { value: 'other' }
            ],
            value: '',
            formattedValue: ''
        };
    },
    computed: {
        ...mapState('post', ['detail', 'content']),
        showModal: {
            get() {
                return this.modelValue;
            },
            set() {}
        }
    },
    methods: {
        ...mapMutations('post', []),
        ...mapActions('post', []),
        close() {
            this.$emit('update:modelValue', false);
            if (this.onClose) {
                this.onClose();
            }
            this.showModal = false;
        },
        onShow() {
            this.hideHeaderError();
            this.getDetail(this.params);
        },
        selectOption(value) {
            this.selectedValue = value;
            if (value !== 'other') {
                this.otherAmount = '';
            }
        },
        handleClick(event) {
            $('.form-item input').removeClass('selected');
            $('.form-item').removeClass('selected');
            let parentElement = $(event.target).parent();
            parentElement.addClass('selected');
            $(event.target).addClass('selected');
        },
        handleFocus(event) {
            $('.form-item input').removeClass('selected');
            $('.form-item').removeClass('selected');
            $(event.target).addClass('selected');
        },
        format() {
            let numericValue = this.formattedValue.replace(/\D/g, '');

            let formattedValue = numericValue.replace(
                /\B(?=(\d{3})+(?!\d))/g,
                '.'
            );
            this.formattedValue = formattedValue;
            this.value = numericValue;
        },
        addCurrency() {
            const arr = this.formattedValue.split('đồng');
            if (this.formattedValue.length > 0 && arr.length <= 1) {
                this.formattedValue += ' đồng';
            }
        },
        payment() {
            var val = $('input.selected').val().replace(/\D/g, '');
            const payload = {
                title: this.paramSends.title,
                amount: val
            };
            repository
                .post(`help/post/${this.paramSends.id}`, payload)
                .then((res) => {
                    let data = res.data;
                    if (data.Code == 200 && data.Data) {
                        const url = data.Data.url;
                        window.open(url, '_blank');
                    }
                });
        }
    }
};
export default Amount;
</script>
