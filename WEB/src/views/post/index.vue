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
    unmounted() {},
    data() {
        return {
            params: helpers.decodeParams(this.$route.query.p),
            showPopup: false,
            paramSends: {}
            // params: decodeURI(this.$route.query.p)
        };
    },
    computed: {
        ...mapState('post', ['detail', 'content','users'])
    },
    methods: {
        ...mapMutations('post', [
            'setWard',
            'setDistricts',
            'addContent',
            // 'removeDescription',
            'removeNullContent'
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
        // autoPlay() {
        //     timer = setTimeout(function () {
        //         var row = document.getElementById('row');
        //         this.toTop = this.toTop - 128;
        //         if (this.toTop < -1152) {
        //             this.toTop = 0;
        //             clearTimeout(timer);
        //             row.onmouseover = clearTimeout(timer);
        //         }
        //         row.style.top = this.toTop + 'px';
        //         autoPlay();
        //     }, 3000);
        // }
    }
};
export default Post;
</script>
