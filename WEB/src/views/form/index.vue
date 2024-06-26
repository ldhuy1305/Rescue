<script>
import moment from 'moment';
import { mapMutations, mapState, mapActions } from 'vuex';

import store from '@/store';
import template from './template.html';
import './style.scss';
import helpers from '@/utils/helpers';
import formStore from '@/views/form/store';
import messages, { MSG_TITLE, MSG_TYPE } from '@/utils/messages';

import RvnSelect from '@/components/select';
import RvnInput from '@/components/input';
import fileUpload from '@/components/fileUpload';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { QuillEditor, Quill } from '@vueup/vue-quill';
import QuillResize from 'quill-resize-module';
import ImageUploader from 'quill-image-uploader';
import axios from 'axios';
import 'quill-image-uploader/dist/quill.imageUploader.min.css';

Quill.register('modules/resize', QuillResize);
Quill.register('modules/imageUploader', ImageUploader);
const form = {
    name: 'Form',
    template: template,
    components: { RvnSelect, RvnInput, fileUpload, VueDatePicker, QuillEditor },
    beforeCreate() {
        if (!store.hasModule('form')) {
            store.registerModule('form', formStore);
        }
    },
    created() {
        this.getInitData();
    },
    beforeMount() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            editorOption: {
                placeholder: 'Nhập nội dung bài viết',
                theme: 'snow',
                modules: {
                    toolbar: [
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [
                            {
                                font: [
                                    'arial',
                                    'times-new-roman',
                                    'helvetica',
                                    'georgia',
                                    'verdana',
                                    'calibri',
                                    'roboto',
                                    'open-sans'
                                ]
                            }
                        ],
                        [{ size: ['small', false, 'large', 'huge'] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                        [{ color: [] }, { background: [] }],
                        [{ script: 'sub' }, { script: 'super' }],
                        [
                            { list: 'ordered' },
                            { list: 'bullet' },
                            { list: 'check' }
                        ],
                        [{ indent: '-1' }, { indent: '+1' }, { align: [] }],
                        [{ direction: 'rtl' }],
                        ['link', 'image', 'video']
                    ],
                    clipboard: {
                        matchVisual: false
                    },
                    resize: {
                        modules: ['Resize']
                    },
                    imageUploader: {
                        upload: async (file) => {
                            const formData = new FormData();
                            formData.append('file', file);
                            formData.append('upload_preset', 'qfuacxsd');
                            formData.append('folder', 'demo');

                            try {
                                const response = await axios.post(
                                    `https://api.cloudinary.com/v1_1/dcyg1qwdc/image/upload`,
                                    formData
                                );
                                return response.data.secure_url;
                            } catch (error) {
                                console.log(error.message);
                            }
                        }
                    }
                }
            }
        };
    },
    computed: {
        ...mapState('form', ['location', 'detail', 'contents', 'validRules'])
    },
    methods: {
        ...mapMutations('form', [
            'setWard',
            'setDistricts',
            'addContent',
            'removeNullContent',
            'addDataNull'
        ]),
        ...mapMutations('app', ['showModalMessage']),
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
            wardName = !wardName || wardName == 'Phường/Xã' ? '' : wardName;
            districtName =
                !districtName || districtName == 'Quận/Huyện'
                    ? ''
                    : districtName;
            cityName = !cityName || cityName == 'Tỉnh/Thành' ? '' : cityName;
            let addressString = `${this.detail.address}${!this.detail.address && (wardName || districtName || cityName) ? ', ' : ''}${wardName || ''}${wardName && districtName ? ', ' : ''}${districtName || ''}${(wardName || districtName) && cityName ? ', ' : ''}${cityName}`;
            const payload = {
                ...this.detail,
                address: addressString
            };
            this.removeNullContent();
            this.addDataNull();
            if (!helpers.isValidData(this.detail, this.validRules)) return;
            this.showModalMessage({
                type: MSG_TYPE.CONFIRM,
                title: MSG_TITLE.C999,
                content: messages.C006,
                callback: (ok) => {
                    if (ok) {
                        this.save({
                            post: payload
                        });
                    }
                }
            });
        }
    }
};
export default form;
</script>
