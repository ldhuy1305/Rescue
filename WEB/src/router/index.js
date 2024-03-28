import { createRouter, createWebHistory } from 'vue-router';
import mainRouter from './main-router';
// import store from '@/store';
// import _ from 'lodash';

/**
 * Import component of view
 */
const NotAccess = () => import('../views/common/403');
const PageNotFound = () => import('../views/common/404');
const ServerError = () => import('../views/common/500');

/**
 * Defined some base router
 */
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
        redirect: '/404'
    }
];
const routes = mainRouter.concat(baseRoutes);
const router = createRouter({
    // eslint-disable-next-line no-undef
    history: createWebHistory(),
    routes
});
router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});
export default router;
