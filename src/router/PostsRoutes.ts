import type { RouteRecordRaw } from "vue-router";
import PostsFetch from "@/components/Posts/PostsFetch.vue";
import PostView from "@/components/Posts/PostView.vue";
import PostAdd from "@/components/Posts/PostAdd.vue";
import PostEdit from "@/components/Posts/PostEdit.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/posts",
    name: "PostsFetch",
    component: PostsFetch
  },
  {
    path: "/posts/new",
    name: "PostAdd",
    component: PostAdd
  },
  {
    path: "/posts/edit/:id",
    name: "PostEdit",
    component: PostEdit,
    props: true
  },
  {
    path: "/posts/:id",
    name: "PostView",
    component: PostView,
    props: true
  },
];

export default routes;