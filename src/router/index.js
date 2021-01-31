import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
// 进度条显示
import NProgress from "nprogress";
import "nprogress/nprogress.css";

import { check, isLogin } from "../utils/auth";
import NotFound from "@/components/404.vue";
import NoPage from "@/components/403.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    component: { render: h => h("router-view") },
    hidenInMenu: true,
    meta: {
      auth: true
    },
    children: [
      {
        path: "/login",
        redirect: "/user/login"
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login")
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "register" */ "../views/User/Register")
      }
    ]
  },
  {
    path: "/",
    meta: {
      authority: ["user", "admin"],
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "layouts" */ "../layouts/BasicLayout"),
    children: [
      {
        path: "/",
        redirect: "/dashboard/analysis"
      },
      {
        path: "/dashboard",
        name: "dashboard",
        component: { render: h => h("router-view") },
        meta: {
          icon: "dashboard",
          title: "仪表盘"
        },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () =>
              import(
                /* webpackChunkName: "analysis" */ "../views/Dashboard/Analysis"
              ),
            meta: {
              // icon: "dashboard",
              title: "分析页"
            }
          }
        ]
      },
      {
        path: "/form",
        name: "form",
        component: { render: h => h("router-view") },
        meta: {
          icon: "form",
          title: "表单",
          authority: ["admin"]
        },
        children: [
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () =>
              import(
                /* webpackChunkName: "BasicFrom" */ "../views/Forms/BasicForm"
              ),
            meta: {
              // icon: "dashboard",
              title: "基础表单"
            }
          },
          {
            path: "/form/step-form",
            name: "stepform",
            component: () =>
              import(
                /* webpackChunkName: "stepform" */ "../views/Forms/StepForm"
              ),
            meta: {
              // icon: "dashboard"
              title: "分布表单"
            },
            hideChildrenMenu: true,
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "stepform" */ "../views/Forms/StepForm/Step1"
                  )
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "stepform" */ "../views/Forms/StepForm/Step2"
                  )
              },
              {
                path: "/form/step-form/r",
                name: "r",
                component: () =>
                  import(
                    /* webpackChunkName: "stepform" */ "../views/Forms/StepForm/Step3"
                  )
              }
            ]
          }
        ]
      },
      {
        path: "/diction",
        name: "diction",
        // component: { render: h => h("router-view") },
        component: () =>
          import(
            /* webpackChunkName: "diction" */ "../views/Dictionor/diction.vue"
          ),
        // children: [
        //   {
        //     path: "/diction/user",
        //     component: () =>
        //       import(
        //         /* webpackChunkName: "diction" */ "../views/Dictionor/diction.vue"
        //       )
        //   }
        // ],
        meta: {
          icon: "user",
          title: "权限中心"
        }
      }
    ]
  },
  {
    path: "*",
    name: "404",
    hidenInMenu: true,
    component: NotFound
  },
  {
    path: "/403",
    name: "403",
    hidenInMenu: true,
    component: NoPage
  }
];
// 解决重复点击出现报错信息
const originalPush = VueRouter.prototype.push;

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
// 页面进度条
router.beforeEach((to, from, next) => {
  // 判断路径
  if (to.path !== from.path) {
    NProgress.start();
  }
  const record = findLast(to.matched, record => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.psth !== "/user/login") {
      next({
        path: "/user/login"
      });
    } else if (to.path !== "/403") {
      next({
        path: "/403"
      });
    }
    NProgress.done();
  }
  next();
});
router.afterEach(() => {
  NProgress.done();
});
export default router;
