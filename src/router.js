import Vue from 'vue'
import VueRouter from 'vue-router'
import AdminCenter from './pages/admin'

Vue.use(VueRouter)

const routes = [    
    {
        path: '/',
        name: 'center',
        component: AdminCenter,
        children:[
            {
                path:'',
                component:()=>import("./pages/admin/charts"),
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: ()=>import("./pages/login")
    },
    {
        path: '/admin',
        name: 'admin',
        component: AdminCenter,
        children:[
            {
                path:'',
                component:()=>import("./pages/admin/charts"),
            },
            {
                path:'charts',
                component:()=>import("./pages/admin/charts"),
            },
            {
                path:'user-manage',
                component:()=>import("./pages/admin/user-manage")
            },
            {
                path:'gym-manage',
                component:()=>import("./pages/admin/gym-manage")
            },
            {
                path:'order-manage',
                component:()=>import("./pages/admin/order-manage")
            },
            {
                path:'place-manage',
                component:()=>import("./pages/admin/place-manage")
            },
            {
                path:'store-manage',
                component:()=>import("./pages/admin/store-manage")
            },
            {
                path:'city-manage',
                component:()=>import("./pages/admin/city-manage")
            },
        ]
    },
]

const router = new VueRouter({
    // mode: 'history',
    routes
})

export default router