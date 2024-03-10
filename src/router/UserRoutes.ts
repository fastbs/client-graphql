import type { RouteRecordRaw } from "vue-router";
import UserLogin from "@/components/User/UserLogin.vue";
import UserLogout from "@/components/User/UserLogout.vue";
import UserRegistration from "@/components/User/UserRegistration.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "UserLogin",
    component: UserLogin
  },
  {
    path: "/logout",
    name: "UserLogout",
    component: UserLogout
  },
  {
    path: "/registration",
    name: "UserRegistration",
    component: UserRegistration
  }
];

export default routes;
