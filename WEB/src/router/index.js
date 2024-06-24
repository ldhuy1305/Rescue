import { createRouter, createWebHistory } from 'vue-router';
import mainRouter from './main-router';
import formRouter from './form-router';
import userRouter from './user-router';
import adminRouter from './admin-router';
// import store from '@/store';
const NotAccess = () => import('../views/common/403');
const PageNotFound = () => import('../views/common/404');
const ServerError = () => import('../views/common/500');

const baseRoutes = [
    {
        path: '/404',
        name: 'pageNotFound',
        component: PageNotFound,
        meta: {
            title: 'Error 404',
            forAll: true
        }
    },
    {
        path: '/403',
        name: 'notAccess',
        component: NotAccess,
        meta: {
            title: 'Error 403',
            forAll: true
        }
    },
    {
        path: '/500',
        name: 'serverError',
        component: ServerError,
        meta: {
            title: 'Error 500',
            forAll: true
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/home'
    }
];
const routes = mainRouter
    .concat(baseRoutes)
    .concat(formRouter)
    .concat(adminRouter)
    .concat(userRouter);
const router = createRouter({
    // eslint-disable-next-line no-undef
    history: createWebHistory(),
    routes
});
router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title;
    const role = localStorage.getItem('role') ?? 0;
    const checkPermission = (to) => {
        if (to.meta.requiredRoles && to.meta.requiredRoles.includes(role))
            return true;
        return false;
    };
    const publicPages = [
        '/login',
        '/signup',
        '/home',
        '/forgot',
        '/403',
        '/404',
        '/500',
        '/news',
        '/form',
        '/post'
    ];
    const authRequired = !publicPages.includes(to.path);
    const token = localStorage.getItem('token');
    const tokenTimeout = localStorage.getItem('tokenTimeout');
    let loggedIn = false;
    if (token && tokenTimeout && new Date(tokenTimeout) >= new Date()) {
        loggedIn = true;
    } else {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTimeout');
        localStorage.removeItem('role');
    }
    if (authRequired && !loggedIn) {
        return next('/login');
    }
    if (!to.meta.forAll) {
        if (authRequired && !checkPermission(to)) {
            if (role == 1) return next('/admin/manage-user');
            else return next('/home');
        }
    }
    next();
});
export default router;
