import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";

/**
 * The routes of the application.
 */
const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../pages/PageHome.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../pages/PageLogin.vue"),
  },
  {
    path: "/signup",
    name: "Signup",
    component: () => import("../pages/PageSignup.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/PageNotFound.vue"),
  }
];

/**
 * Creates a new router instance.
 */
const router = createRouter({
  history: createWebHistory("./"),
  routes,
});

router.afterEach(to => {
  document.title = (to.name as string) + " | Hackathon" ;
});

export default router;