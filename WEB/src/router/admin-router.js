const manageUser = () => import('@/views/admin/manageUser');
const acceptPost = () => import('@/views/admin/acceptPost');
const managePost = () => import('@/views/admin/managePost');
const manageHelp = () => import('@/views/admin/manageHelp');
// const createPost = () => import('@/views/admin/createPost');
const statistics = () => import('@/views/admin/statistics');

export default [
    {
        path: '/admin/manage-user',
        name: 'manageUser',
        component: manageUser,
        meta: {
            title: 'Quản lý người dùng',
            layout: 'AdminLayout'
        }
    },
    {
        path: '/admin/accept-post',
        name: 'acceptPost',
        component: acceptPost,
        meta: {
            title: 'Phê duyệt bài hỗ trợ',
            layout: 'AdminLayout'
        }
    },
    {
        path: `/admin/manage-post`,
        name: 'managePost',
        component: managePost,
        meta: {
            title: 'Quản lý bài hỗ trợ',
            layout: 'AdminLayout'
        }
    },
    {
        path: `/admin/manage-help`,
        name: 'manageHelp',
        component: manageHelp,
        meta: {
            title: 'Lịch sử hỗ trợ',
            layout: 'AdminLayout'
        }
    },
    // {
    //     path: `/admin/create-Post`,
    //     name: 'createPost',
    //     component: createPost,
    //     meta: {
    //         title: 'Tạo mới bài hỗ trợ',
    //         layout: 'AdminLayout'
    //     }
    // },
    {
        path: `/admin/statistics`,
        name: 'statistics',
        component: statistics,
        meta: {
            title: 'Thống kê',
            layout: 'AdminLayout'
        }
    }
];
