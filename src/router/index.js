import VueRouter from "vue-router";
import Vue from "vue";

Vue.use(VueRouter)
const routes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: '登录'
        },
        component: () => import( '@/views/Login')
    },
    {
        path: "/Home",
        name: "Home",
        component: () => import('../views/Home'),
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: '数据概览'
                },
                component: () => import( "@/views/DashBoard")
                //数据概览
            },
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
            {
                path:'/TraceSource',
                name:'TraceSource',
                component:()=>import('@/views/TraceSource.vue')
                //
            },
            {
              path: '/AsinDetails',
              name:'AsinDetails',
              component:()=>import('@/views/AsinDetails.vue')
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
