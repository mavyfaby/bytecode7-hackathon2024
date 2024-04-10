import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHistory } from "vue-router";
import { getHistoryLength } from "~/utils/page";
import { Config } from "~/config";
import { useStore } from "~/store";

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
    path: "/admin/login",
    name: "AdminLogin",
    component: () => import("../pages/admin/AdminLogin.vue"),
  },
  {
    path: "/admin/:tab",
    name: "Admin",
    component: () => import("../pages/admin/AdminHome.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../pages/PageNotFound.vue"),
  }
];

// Set initial history length
Config.initialHistoryLength = getHistoryLength();

/**
 * Creates a new router instance.
 */
const router = createRouter({
  history: createWebHistory("./"),
  routes,
});

router.afterEach(to => {
  // Get store
  const store = useStore();
  // Set title
  document.title = (to.name as string) + " | Hackathon" ;
  // Set back button visibility
  store.isShowBackButton = window.history.state.position - (Config.initialHistoryLength ? (Config.initialHistoryLength as number) : 0) > 0;
});

export default router;