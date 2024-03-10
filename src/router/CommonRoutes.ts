import type { RouteRecordRaw } from "vue-router";
import HomePage from "@/components/HomePage.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: HomePage
  },
];

export default routes;
