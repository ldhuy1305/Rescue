<script>
import template from './template.html';
import './style.scss';
import { mapMutations } from 'vuex';
import helpers from '@/utils/helpers';
import repository from '@/utils/repository';

import Paging from '@/components/pagination';
import SelectBox from '@/components/select';
const popupHelp = {
    template: template,
    props: {
        modelValue: Boolean,
        paramSends: Object,
        onClose: Function
    },
    components: { Paging, SelectBox },
    created() {},
    beforeMount() {},
    mounted() {},
    beforeUpdate() {},
    updated() {},
    beforeUnmount() {},
    unmounted() {},
    data() {
        return {
            id: this.paramSends.id,
            conditions: {
                page: 1,
                size: 10
            },
            options: [
                {
                    code: 10,
                    name: '10'
                },
                {
                    code: 20,
                    name: '20'
                },
                {
                    code: 50,
                    name: '50'
                }
            ]
        };
    },
    computed: {
        showModal: {
            get() {
                return this.modelValue;
            },
            set() {}
        }
    },
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        close() {
            this.$emit('update:modelValue', false);
            if (this.onClose) {
                this.onClose();
            }
            this.showModal = false;
        },
        format(value) {
            if (!helpers.isNullOrEmpty(value)) {
                let formattedValue = value
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
                if (formattedValue.length > 0) {
                    formattedValue += ' đồng';
                }
                return formattedValue;
            }
            return '0 đồng';
        },
        handleSearch() {
            this.changeCurrentPage({
                currentPage: 1,
                perPage: this.listData.pagination.size
            });
        },
        changeCurrentPage(data) {
            console.log(data);
            this.conditions.page = data.currentPage;
            this.conditions.size = data.perPage;
            this.search();
        },
        search() {
            repository
                .get(`/committee/user/${this.id}`, {
                    params: this.conditions
                })
                .then((res) => {
                    let data = res.data;
                    if ((data.Code == 200) & data.Data) {
                        this.paramSends.list = data.Data.list;
                        if (data.Data.list.length > 0) {
                            this.paramSends.pagination = {
                                size: parseInt(data.Data.list[0].size),
                                page: parseInt(data.Data.list[0].page),
                                total: parseInt(data.Data.list[0].total)
                            };
                        }
                    }
                });
        },
        formatDate(date) {
            if (date != null) return helpers.formatDate(date);
        }
    }
};
export default popupHelp;
</script>
