<script>
import template from './template.html';
import Loading from '@/components/loading';
import ModalMessage from '@/shared/modal-message';
import { SidebarMenu } from 'vue-sidebar-menu';
import './style.scss';
export default {
    name: 'MainLayout',
    template: template,
    components: { Loading, ModalMessage, SidebarMenu },
    mounted() {},
    updated() {},
    watch: {},

    data() {
        return {
            selectedTheme: 'white-theme',
            collapsed: false,
            menu: [
                {
                    header: 'Quản lý hệ thống',
                    hiddenOnCollapse: true
                },
                {
                    title: 'Người dùng',
                    icon: 'fa fa-user',
                    child: [
                        {
                            href: '/admin/manage-user',
                            title: 'Danh sách người dùng'
                        }
                    ]
                },
                {
                    title: 'Đơn hỗ trợ',
                    icon: 'fa-regular fa-newspaper',
                    child: [
                        {
                            href: '/admin/manage-help',
                            title: 'Lịch sử hỗ trợ'
                        },
                        {
                            href: '/admin/manage-post',
                            title: 'Danh sách đơn hỗ trợ'
                        },
                        {
                            href: '/admin/accept-post',
                            title: 'Phê duyệt đơn hỗ trợ'
                        }
                    ]
                },
                {
                    title: 'Hệ thống',
                    icon: 'fa-solid fa-gear',
                    child: [
                        {
                            href: '/admin/statistics',
                            title: 'Thống kê'
                        },
                        {
                            // href: '/logout',
                            title: 'Đăng xuất'
                        }
                    ]
                }
            ]
        };
    },
    methods: {
        onCollapse(collapsed) {
            this.collapsed = collapsed;
        },
        onItemClick(event, item) {
            if (item.title == 'Đăng xuất') {
                localStorage.removeItem('token');
                localStorage.removeItem('tokenTimeout');
                this.$router.push('/home');
            }
        }
    }
};
</script>
