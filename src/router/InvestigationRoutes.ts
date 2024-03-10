import type { RouteRecordRaw } from "vue-router";
import InvestigationsFetch from "@/components/Investigations/InvestigationsFetch.vue";
import InvestigationView from "@/components/Investigations/InvestigationView.vue";
import InvestigationAdd from "@/components/Investigations/InvestigationAdd.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/investigations",
    name: "InvestigationsFetch",
    component: InvestigationsFetch
  },
  {
    path: "/investigations/new",
    name: "InvestigationAdd",
    component: InvestigationAdd
  },
  {
    path: "/investigations/:id",
    name: "InvestigationView",
    component: InvestigationView,
    props: true,
    /*props: {
      id: {
        type: String,
        required: true,
      },
      ext: {
        type: String,
        required: false,
        default: "DEF",
      },
    },
*/
    meta: {
      ext: "My Meta",
    },
  },
];

export default routes;


