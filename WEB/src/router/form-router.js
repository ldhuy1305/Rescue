const form = () => import('@/views/form');
const post = () => import('@/views/post');
const news = () => import('@/views/news');
export default [
    {
        path: '/form',
        name: 'form',
        component: form,
        meta: {
            title: 'Biểu mẫu'
        }
    },
    {
        path: '/post',
        name: 'post',
        component: post,
        meta: {
            title: 'Bài viết'
        }
    },
    {
        path: '/news',
        name: 'news',
        component: news,
        meta: {
            title: 'Tin tức'
        }
    }
];
