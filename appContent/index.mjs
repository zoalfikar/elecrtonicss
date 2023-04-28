import routes from "./router/routes.mjs";
const app = Vue.createApp({
    data() {
        return {}
    },
    methods: {
        goto: (url) => {
            router.push(url)
        }
    }
})
const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes
})
app.use(router)
app.mount('#app');