<script>
import store from '@/store';
import template from './template.html';
import './style.scss';
import { mapMutations, mapState, mapActions } from 'vuex';
import postStore from '@/views/post/store';
import $ from 'jquery';
// import helpers from '@/utils/helpers';
const Amount = {
    template: template,
    beforeCreate() {
        if (!store.hasModule('post')) {
            store.registerModule('post', postStore);
        }
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
            ]
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
            // this.$emit('update:modelValue', false);
            // if (this.onClose) {
            //     this.onClose();
            // }
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
        updateOtherAmount() {
            if (this.otherAmount < 10) {
                //
            }
        },
        handleClick(event) {
            $('.form-item input').removeClass('selected');
            $('.form-item').removeClass('selected');
            let parentElement = $(event.target).parent();
            parentElement.addClass('selected');
            $(event.target).addClass('selected');
        },
        handleFocus() {
            $('.form-item input').removeClass('selected');
            $('.form-item').removeClass('selected');
        }
    }
};
export default Amount;
</script>
