// Роутер подключил изначально, думал сделать отдельную страницу для любимых персонажей. Оставлю на будущее.
import Vue from "vue";
import VueRouter from "vue-router";
import Characters from "../components/Characters.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Characters",
        component: Characters,
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;