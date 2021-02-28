import auth from "../middlewares/auth"

import Home from "../components/Home"
import Login from "../components/Login"
import Register from "../components/Register"

export const mainRoutes = [
    {
        path: '/',
        component: Home,
        name: "home",
    },
    {
        path: '/login',
        component: Login,
        name: "login",
    },
    {
        path: '/register',
        component: Register,
        name: "register",
    },
    {
        path: '/products',
        component: () => import ( /* webpackChunkName: "js/product" */ '../components/Product'),
        name: "products",
        meta: {
            middleware: [
                auth
            ]
        }
    },
];