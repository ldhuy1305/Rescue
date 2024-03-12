const home = () => import('@/views/main/home/index.vue');
// const signin = () => import('@/views/main/signin');
// const signup = () => import('@/views/main/signup');
export default [
    {
        path: '/home',
        name: 'home',
        component: home,
        meta: {
            title: 'Home'
        }
    }
    // {
    //     path: '/signin',
    //     name: 'signin',
    //     component: signin,
    //     meta: {
    //         title: 'Sign In',
    //         layout: 'EmptyLayout'
    //     }
    // },
    // {
    //     path: `/signup`,
    //     name: 'signup',
    //     component: signup,
    //     meta: {
    //         title: 'Sign Up'
    //     }
    // }
];
