import Vue from 'vue';
import VueRouter from 'vue-router';
import data from '@/store/data.js';

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Home',
        props: true,
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
    },
    {
        path: '/destination/:slug',
        name: 'DestinationDetails',
        props: true,
        component: () => import(/* webpackChunkName: "brazil" */ '@/views/DestinationDetails.vue'),
        children: [
            {
                path: ':experienceSlug',
                name: 'experienceDetails',
                props: true,
                component: () => import(/*webpackChunkName: "ExperienceDetails"*/ '@/views/ExperienceDetails'),
            },
        ],
        beforeEnter: (to, from, next) => {
            const exists = data.destinations.find(destination => destination.slug === to.params.slug);
            if (exists) {
                next();
            } else {
                next({
                    name: 'notFound',
                });
            }
        },
    },
    {
        path: '/user',
        name: 'user',
        component: () => import(/* weppackChunkName: "User" */ '@/views/User'),
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "Login" */ '@/views/Login'),
    },
    {
        path: '/invoices',
        name: 'invoices',
        component: () => import(/* webpackChunkName: "Invoice" */ '@/views/Invoices'),
        meta: { requiresAuth: true },
    },
    {
        path: '/404',
        alias: '*',
        name: 'notFound',
        component: () => import(/* webpackChunkName: "NotFound" */ '@/views/NotFound'),
    },
];

const scrollBehavior = (to, from, savedPosition) => {
    if (savedPosition) {
        return savedPosition;
    } else {
        const position = {};
        if (to.hash) {
            position.selector = to.hash;
            if (to.hash === '#experience') {
                position.offset = {
                    y: 140,
                };
            }
            if (document.querySelector(to.hash)) {
                return position;
            }
            return false;
        }
    }
};

const router = new VueRouter({
    mode: 'history',
    linkExactActiveClass: 'vue-school-active-class',
    base: process.env.BASE_URL,
    scrollBehavior,
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (!data.user) {
            next({
                name: 'login',
                query: {
                    redirect: to.fullPath,
                },
            });
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
