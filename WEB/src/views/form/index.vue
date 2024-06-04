<script>
import moment from 'moment';
import { mapMutations, mapState, mapActions } from 'vuex';

import store from '@/store';
import template from './template.html';
import './style.scss';
import helpers from '@/utils/helpers';
import formStore from '@/views/form/store';
import messages from '@/utils/messages';

import Select from '@/components/select';
import Input from '@/components/input';
import fileUpload from '@/components/fileUpload';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const form = {
    name: 'Form',
    template: template,
    components: { Select, Input, fileUpload, VueDatePicker },
    beforeCreate() {
        if (!store.hasModule('form')) {
            store.registerModule('form', formStore);
        }
    },
    created() {
        this.getInitData();
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            // detail: {},
            // contents: []
        };
    },
    computed: {
        ...mapState('form', ['location', 'detail', 'contents'])
    },
    methods: {
        ...mapMutations('form', [
            'setWard',
            'setDistricts',
            'addContent',
            'removeNullContent',
            'addDataNull'
        ]),
        ...mapActions('form', [
            'getInitData',
            'getDistricts',
            'getWards',
            'removeContent',
            'save'
        ]),
        onFileChanged() {},
        onClick() {},
        setDistricts() {
            this.getDistricts(this.detail.city);
        },
        setWards() {
            this.getWards(this.detail.district);
        },
        getUploadedData(file) {
            this.fileSelected = true;
            this.file = file;
        },

        validateDate() {
            if (moment(this.detail.dateTo) < moment(this.detail.dateFrom)) {
                helpers.setItemError('dateFrom', messages.E008);
            }
            // eslint-disable-next-line no-undef
            else $(`.item-error`).RemoveError();
        },
        saveData() {
            let wardName = helpers.findObjectInArrayByKey(
                this.location.wards,
                'code',
                this.detail.ward
            ).name;
            let districtName = helpers.findObjectInArrayByKey(
                this.location.districts,
                'code',
                this.detail.district
            ).name;
            let cityName = helpers.findObjectInArrayByKey(
                this.location.cities,
                'code',
                this.detail.city
            ).name;
            const payload = {
                ...this.detail,
                address: `${this.detail.address}, ${wardName} , ${districtName}, ${cityName}`
            };
            this.removeNullContent();
            this.addDataNull();
            this.save({
                post: payload,
                content: this.contents
            });
        }
    }
};
export default form;
</script>
