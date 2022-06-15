import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/Home'
    },
    {
        path: "/Home",
        name: "Home",
        component: () => import('../views/Home'),
        children: [
            {
                path: "/DUnit",
                name: "DUnit",
                component: () => import("@/views/DUnit")
                //某领域的关键作者和单位
            },
            {
                path: "/DAuthor",
                name: "DAuthor",
                component: () => import("@/views/DAuthor")
                //某领域的关键作者和单位
            },
            {
                path: '/DCJournal',
                name: 'DCJournal',
                component: () => import('@/views/DCJournal')
                //某领域的关键会议或期刊
            },
            {
                path: '/DDAUnit',
                name: 'DDAUnit',
                component: () => import('@/views/DDAUnit')
                //某领域某年的关键作者和单位
            },
            {
                path: '/EntitySearch',
                name: 'EntitySearch',
                component: () => import('@/views/EntitySearch')
                //输入一个实体 查询关联的所有关系和关联实体
            },
            {
                path: '/EntityRelation',
                name:'EntityRelation',
                component:()=>import('@/views/EntityRelation.vue')
                //输入两个实体 查询其可能存在的多跳关系
            },

        ]
    },

];
const router = new VueRouter(
    {
        routes,
        // mode: 'history'
        mode: 'hash',
    }
);
export default router;
