import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/HomePage.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/AuthPage.vue"),
  },
  {
    path: "/my-account",
    name: "account",
    component: () => import("../views/MyAccount.vue"),
  },
  {
    path: "/courses",
    name: "courses",
    component: () => import("../views/CourseList.vue"),
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const state = JSON.parse(localStorage.getItem("state"));
  if (to.meta.requiresAuth && !state?.auth?.user?.uid) {
    next("/login");
  } else if ((to.path == "/main" || to.path == "/login") && state?.auth?.user?.uid) {
    next("/my-account");
  } else {
    next();
  }
});

export default router;
