import { createRouter, createWebHistory } from 'vue-router';
import mainRouter from './main-router';
// import store from '@/store';
// import _ from 'lodash';

/**
 * Import component of view
 */
const NotAccess = () => import('@/views/common/403');
const PageNotFound = () => import('@/views/common/404');
const ServerError = () => import('@/views/common/500');

/**
 * Defined some base router
 */
const baseRoutes = [
    {
        path: '/404',
        name: 'PageNotFound',
        component: PageNotFound,
        meta: {
            title: 'Error 404',
            forAll: true
        }
    },
    {
        path: '/403',
        name: 'NotAccess',
        component: NotAccess,
        meta: {
            title: 'Error 403',
            forAll: true
        }
    },
    {
        path: '/500',
        name: 'ServerError',
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
const routes = baseRoutes.concat(mainRouter);
// console.log(baseRoutes);
const router = createRouter({
    // eslint-disable-next-line no-undef
    history: createWebHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    }
});
// router.beforeEach((to, from, next) => {
//     const checkPermission = (to) => {
//         let permission = helpers.permission();
//         if (helpers.isNullOrEmpty(permission)) {
//             permission = 1;
//         }
//         const allMenus = menus.concat(MobileMenu);
//         const length = allMenus.length;
//         let item = null;
//         for (let i = 0; i < length; i++) {
//             const countChild = allMenus[i].childMenus?.length ?? 0;
//             if (countChild > 0) {
//                 item = _.find(allMenus[i].childMenus, (x) => {
//                     return x.id == to.name;
//                 });
//                 if (item) {
//                     break;
//                 }
//             } else {
//                 if (to.name == allMenus[i].id) {
//                     item = { ...allMenus[i] };
//                     break;
//                 }
//             }
//         }
//         if (item == null) {
//             item = {
//                 id: to.name,
//                 role:
//                     to.name == 'Gs0030i' ||
//                     to.name == 'Gs0194v' ||
//                     to.name == 'Gs0720v'
//                         ? ['3', '2', '1']
//                         : ['3']
//             };
//         }
//         if (item.role.includes(permission)) {
//             if (NeedMoreCheck[permission]?.includes(item.id)) {
//                 const per = _.findLast(store._state.data.app.menuPermission, {
//                     機能ID: item.id
//                 });
//                 if (
//                     !(
//                         per &&
//                         ((item.isCheck利用者権限 === true &&
//                             per.利用者権限 == 1) ||
//                             (item.isCheck利用者権限 !== true &&
//                                 per.上司権限 == 1))
//                     )
//                 ) {
//                     return false;
//                 }
//             }
//             return true;
//         }
//         return false;
//     };
//     store.commit('app/hideHeaderError');
//     const publicPages = ['/private/login', '/public/login', '/gm/gm0010i'];
//     const authRequired = !publicPages.includes(to.path);
//     const token = sessionStorage.getItem('token');
//     const tokenTimeout = sessionStorage.getItem('tokenTimeout');
//     const appData = store._state.data.app;
//     const isPublic = sessionStorage.getItem('isPublic');
//     if (`${isPublic ?? ''}` != 'true') {
//         appData.loginScreen = '/private/login';
//         appData.homeScreen = '/gs/gs0510v';
//         appData.isPublic = false;
//     } else {
//         appData.loginScreen = '/public/login';
//         appData.homeScreen = '/gs/gs0030i';
//         appData.isPublic = true;
//     }
//     let loggedIn = false;
//     if (token && tokenTimeout && new Date(tokenTimeout) >= new Date()) {
//         loggedIn = true;
//     } else {
//         sessionStorage.removeItem('token');
//         sessionStorage.removeItem('tokenTimeout');
//     }
//     if (authRequired && !loggedIn) {
//         return next(appData.loginScreen);
//     }
//     if (!authRequired && loggedIn) {
//         sessionStorage.removeItem('token');
//         sessionStorage.removeItem('tokenTimeout');
//     }
//     if (!to.meta.forAll) {
//         if (authRequired && !checkPermission(to)) {
//             return next('/403');
//         }
//         if (!appData.isMobile && to.meta.isMobile) {
//             if (to.meta.pcScreen) {
//                 return next(to.meta.pcScreen);
//             }
//             return next(appData.homeScreen);
//         }
//         if (appData.isMobile && !to.meta.isMobile) {
//             if (to.meta.spScreen) {
//                 return next(to.meta.spScreen);
//             }
//             return next('/gm/gm0020i');
//         }
//         if (
//             !to.meta.notCheckPublic &&
//             ((!appData.isPublic && to.meta.isPublic) ||
//                 (appData.isPublic && !to.meta.isPublic))
//         ) {
//             return next(appData.homeScreen);
//         }
//     }
//     document.title = (to.meta.title || 'Gripper') + ' | Gripper';
//     next();
// });

export default router;
