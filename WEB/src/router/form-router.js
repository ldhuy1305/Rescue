const form = () => import('@/views/form');
const post = () => import('@/views/post');
const news = () => import('@/views/news');
export default [
    {
        path: '/form',
        name: 'form',
        component: form,
        meta: {
            title: 'Biểu mẫu',
            requiredRoles: ['0', '2']
        }
    },
    {
        path: '/post',
        name: 'post',
        component: post,
        meta: {
            title: 'Bài viết',
            requiredRoles: ['0', '2']
        }
    },
    {
        path: '/news',
        name: 'news',
        component: news,
        meta: {
            title: 'Tin tức',
            requiredRoles: ['0', '2']
        }
    }
];
