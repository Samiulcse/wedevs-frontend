import VueRouter from 'vue-router'
import Vue from 'vue'


import middlewarePipeline from './middlewares/middlewarePipeline'
import store from './stores/store'

import {mainRoutes} from "./routes/mainRoutes"

Vue.use(VueRouter)

const routes = []

routes.push(...mainRoutes)

const router = new VueRouter({
    routes, // short for `routes: routes`
    mode: 'history',
})

router.beforeEach((to, from, next) => {

    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next,
        store
    }
    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })
})

export default router
