import Vue from "vue";
import VueRouter from "vue-router";
import Login from "@/views/Login";
import Layout from '@/components/Layout'
import Home from '@/views/Home'
import user from '@/views/user/user'
import bookinfo from '@/views/Book/bookinfo'
import booktype from '@/views/Book/booktype'
import chukusearch from '@/views/kucun/chukusearch'
import kucunsearch from '@/views/kucun/kucunsearch'
import rukusearch from '@/views/kucun/rukusearch'

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login
  },
  {
    path: "/",
    name: "layout",
    component: Layout,
    redirect:"/home",
    children:[
      {
        path:'/home',
        name:'home',
        component:Home,
        meta:{
          title:'首页'
        }
      },
      {
        path:'/user',
        name:'user',
        component:user,
        meta:{
          title:'用户'
        }
      },
      {
        path:'/bookinfo',
        name:'bookinfo',
        component:bookinfo,
        meta:{
          title:'图书信息'
        }
      },
      {
        path:'/booktype',
        name:'booktype',
        component:booktype,
        meta:{
          title:'图书类型'
        }
      },
      {
        path:'/chukusearch',
        name:'chukusearch',
        component:chukusearch,
        meta:{
          title:'出库查询'
        }
      },
      {
        path:'/kucunsearch',
        name:'kucunsearch',
        component:kucunsearch,
        meta:{
          title:'库存查询'
        }
      },
      {
        path:'/rukusearch',
        name:'rukusearch',
        component:rukusearch,
        meta:{
          title:'入库查询'
        }
      },
    ]
  }

];

const router = new VueRouter({
  // mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
