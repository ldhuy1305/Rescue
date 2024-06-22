<script>
import template from './template.html';
import './style.scss';
import { mapMutations } from 'vuex';
import helpers from '@/utils/helpers';
import repository from '@/utils/repository';
import debounce from 'lodash/debounce';

import Paging from '@/components/pagination';
import SelectBox from '@/components/select';
import Input from '@/components/input';
const popupHelp = {
    template: template,
    props: {
        showModal: Boolean,
        paramSends: Object,
        onClose: Function
    },
    components: { Paging, SelectBox, Input },
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
                keyword: '',
                page: 1,
                size: 10,
                sort: 'name',
                order: 'asc'
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
    computed: {},
    methods: {
        ...mapMutations('app', ['showModalMessage']),
        close() {
            if (this.onClose) {
                this.onClose();
            }
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
            this.conditions.page = data.currentPage;
            this.conditions.size = data.perPage;
            this.search();
        },
        search() {
            repository
                .get(`/committee/user/${this.paramSends.id}`, {
                    params: this.conditions
                })
                .then((res) => {
                    let data = res.data;
                    if (data.Code == 200) {
                        this.paramSends.list = data.Data.list ?? [];
                        if (data.Data.list && data.Data.list.length > 0) {
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
        },
        debouncedSearch: debounce(function () {
            this.search();
        }, 300),
        handleExport() {
            let payload = { ...this.conditions };
            payload.size = 0;
            repository
                .get(`/committee/user/${this.paramSends.id}/export`, {
                    responseType: 'blob',
                    params: payload
                })
                .then((res) => {
                    const url = URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute(
                        'download',
                        'danh_sach_nguoi_ho_tro.xlsx'
                    );
                    document.body.appendChild(link);
                    link.click();
                });
        },
        sort(sortBy) {
            if (this.conditions.sort === sortBy) {
                this.conditions.order =
                    this.conditions.order === 'asc' ? 'desc' : 'asc';
            } else {
                this.conditions.sort = sortBy;
                this.conditions.order = 'asc';
            }
            this.search();
        }
    }
};
export default popupHelp;
</script>
