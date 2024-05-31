const user = () => import('@/views/user');
const helpHistory = () => import('@/views/helpHistory');
export default [
    {
        path: `/user`,
        name: 'user',
        component: user,
        meta: {
            title: 'Thông tin cá nhân'
        }
    },
    {
        path: '/user/helpHistory',
        name: 'helpHistory',
        component: helpHistory,
        meta: {
            title: 'Lịch sử hỗ trợ'
        }
    }
];
