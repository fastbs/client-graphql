import type { RouteRecordRaw } from "vue-router";
import RefCompanies from "@/components/References/RefCompanies.vue";
import RefEmployees from "@/components/References/RefEmployees.vue";
import RefJobTitles from "@/components/References/RefJobTitles.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/ref_companies",
    name: "RefCompanies",
    component: RefCompanies
  },
  {
    path: "/ref_employees",
    name: "RefEmployees",
    component: RefEmployees
  },
  {
    path: "/ref_jobtitles",
    name: "RefJobTitles",
    component: RefJobTitles
  },
];

export default routes;