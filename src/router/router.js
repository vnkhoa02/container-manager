import {createRouter, createWebHistory} from "vue-router";
import Index from "@/views";
import Login from "@/views/login";
import {store} from '@/store'
import PageNotFound from "@/components/PageNotFound";
import CookiesUtil from "@/util/Cookie";
import Home from "@/views/home";
import About from "@/views/about";
import Register from "@/views/register";
import NewBuild from "@/views/build/new";
import Template from "@/views/build/template";
import Manage from "@/views/manage";

let routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
        children: [
            {
                path: "/",
                name: "Home",
                component: Home,
            },
            {
                path: "/build/new",
                name: "NewBuild",
                component: NewBuild,
            },
            {
                path: "/build/template",
                name: "Template",
                component: Template,
            },
            {
                path: "/manage",
                name: "Manage",
                component: Manage,
            },
            {
                path: "/about",
                name: "About",
                component: About,
            }
        ],
        beforeEnter: async (to, from, next) => {
            const isLogin = store.state.isLogin
            if (isLogin) {
                next()
            } else {
                next({path: "/login"});
            }
        },
    },
    {
        path: "/login",
        name: "Login",
        component: Login,
    },
    {
        path: "/register",
        name: "Register",
        component: Register,
    },
    {
        path: "/:catchAll(.*)", // Unrecognized path automatically matches 404
        component: PageNotFound
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    await beforeEach(to, from, next, store)
})

async function beforeEach(to, from, next, store) {
    const accessToken = CookiesUtil.getAccessToken()
    const refreshToken = CookiesUtil.getRefreshToken()

    if (accessToken && refreshToken) {
        store.dispatch('login')
        if (to.path === "/login") {
            next({path: "/"});
        } else {
            next();
        }
    } else {
        next()
    }
}

export default router;
