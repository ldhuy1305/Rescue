const form = () => import('@/views/form');
const post = () => import('@/views/post');
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
    }
];
