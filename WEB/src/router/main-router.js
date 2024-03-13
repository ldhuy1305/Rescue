const home = () => import('@/views/main/home/index.vue');
const login = () => import('@/views/main/login');
const signup = () => import('@/views/main/signup');
export default [
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: 'Home'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: login,
        meta: {
            title: 'Log in',
            layout: 'EmptyLayout'
        }
    },
    {
        path: `/signup`,
        name: 'signup',
        component: signup,
        meta: {
            title: 'Sign Up'
        }
    }
];
