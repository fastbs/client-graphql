import { createRouter, createWebHistory } from "vue-router";
import process from "process";

import CommonRoutes from "./CommonRoutes";
import UserRoutes from "./UserRoutes";
import PostsRoutes from "./PostsRoutes";
import ReferencesRoutes from "./ReferencesRoutes";
import InvestigationRoutes from "./InvestigationRoutes";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: CommonRoutes.concat(UserRoutes, PostsRoutes, ReferencesRoutes, InvestigationRoutes),
});

export default router;
