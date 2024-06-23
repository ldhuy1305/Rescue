<script>
import store from '@/store';
import template from './template.html';
import './style.scss';
import { mapMutations, mapState, mapActions } from 'vuex';
import postStore from '@/views/post/store';
import Select from '@/components/select';
import Input from '@/components/input';
import PopupAmount from './popup';
import helpers from '@/utils/helpers';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
const Post = {
    name: 'Post',
    template: template,
    components: { Select, Input, PopupAmount },
    beforeCreate() {
        if (!store.hasModule('post')) {
            store.registerModule('post', postStore);
        }
    },
    created() {
        this.getInitData(this.params);
    },
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {
        this.setInitMode();
    },
    data() {
        return {
            params: helpers.decodeParams(this.$route.query.p),
            showPopup: false,
            paramSends: {}
        };
    },
    computed: {
        ...mapState('post', ['detail', 'content', 'users']),
        formattedContent() {
            const parser = new DOMParser();
            const decodedString = parser.parseFromString(
                this.detail.content,
                'text/html'
            ).body.textContent;
            return decodedString;
        }
    },
    methods: {
        ...mapMutations('post', [
            'setWard',
            'setDistricts',
            'addContent',
            // 'removeDescription',
            'removeNullContent',
            'setInitMode'
        ]),
        ...mapActions('post', [
            'getInitData',
            'getDistricts',
            'getWards',
            'removeContent',
            'save'
        ]),
        onFileChanged() {},
        onClick() {},
        format(value) {
            let formattedValue = value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
            if (formattedValue.length > 0) {
                formattedValue += ' đồng';
            }
            return formattedValue;
        },
        encodePhoneNumber(value) {
            return helpers.encodePhoneNumber(value);
        },
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
        saveData() {
            this.removeNullContent();
            this.save({
                post: this.detail,
                content: this.contents
            });
        },
        showPopupAmount() {
            this.paramSends = {
                id: this.params,
                title: this.detail.title
            };
            this.showPopup = true;
        }
    }
};
export default Post;
</script>
