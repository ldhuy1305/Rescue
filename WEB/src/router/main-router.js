const home = () => import('@/views/main/home');
const login = () => import('@/views/main/login');
const signup = () => import('@/views/main/signup');
export default [
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: 'Trang chủ'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: 'Đăng nhập',
            layout: 'EmptyLayout'
        }
    },
    {
        path: `/signup`,
        name: 'signup',
        component: signup,
        meta: {
            title: 'Đăng ký',
            layout: 'EmptyLayout'
        }
    }
];
