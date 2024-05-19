<script>
import store from '@/store';
import template from './template.html';
import './style.scss';
import { mapMutations, mapState, mapActions } from 'vuex';
import formStore from '@/views/form/store';
import Select from '@/components/select';
import Input from '@/components/input';
import fileUpload from '@/components/fileUpload';
// import Input from '@components/input';
const form = {
    name: 'Form',
    template: template,
    components: { Select, Input, fileUpload },
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
            // 'removeDescription',
            'removeNullContent'
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
        // removeContent(index) {
        //     this.removeImage();
        //     // this.removeDescription(index);
        // },
        saveData() {
            this.removeNullContent();
            this.save({
                post: this.detail,
                content: this.contents
            });
        }
    }
};
export default form;
</script>
