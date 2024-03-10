<template>
  <div class="card mb-3 flex flex-column justify-content-center" style="padding-top: 1.5rem;">
    <div class="flex">
      <div class="flex flex-shrink-0 justify-content-start">
        <h2>Публикации</h2>
      </div>
      <div class="flex flex-grow-1 justify-content-end ">
        <router-link v-if="store.checkPermission('posts', 'post')" :to="{ name: 'PostAdd' }">
          <pButton icon="pi pi-plus" aria-label="Добавить публикацию" v-tooltip.left="'Добавить публикацию'" rounded
            size="small" />
        </router-link>
      </div>
    </div>

    <pDivider :pt="{ root: { class: 'mt-0' } }" />
    <div class="flex justify-content-center">
      <pCard v-if="!loading" :pt="{ root: { class: 'sm:col-12 md:col-12 lg:col-8 xl:col-6 mb-3' } }">
        <template #title>
          <div class="grid">
            <div class="col-6">{{ post!.title }}</div>
            <div class="col-6 flex flex-wrap justify-content-end gap-3">
              <router-link v-if="store.checkPermission('posts', 'put')"
                :to="{ name: 'PostEdit', params: { id: post!._id } }">
                <pButton label="Изменить" severity="success" />
              </router-link>
              <pButton v-if="store.checkPermission('posts', 'delete')" @click="deletePost()" label="Удалить"
                severity="danger" />
            </div>
            <pDivider />
          </div>
        </template>
        <template #content>
          <div class="grid">
            <div class="col-8">
              <p class="text-3xl">{{ post!.description }}</p>
              <span class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ categories!.find((x) => x._id == post!.category._id)!.name }}</span>
              </span>
            </div>
            <div class="col-4">
              <img v-if="post!.filename" :src="store.config.postImagePath + post!.filename"
                class="max-w-full p-1 border-1 border-blue-500" alt="Post image">
            </div>
          </div>
        </template>
      </pCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import { useMainStore } from "@/store/MainStore";
import PostsService from "@/services/PostsService";
import type { PostDto, CategoryDto } from "@/services/dto/posts.dto";

const store = useMainStore();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});


const post = ref<PostDto>();
const categories = ref<CategoryDto[]>();
const loading = ref(true);

const getPost = async () => {
  const response = await PostsService.get(props.id);
  if (response) {
    post.value = response.post;
    categories.value = response.categories;
    loading.value = false;
  }
};

const deletePost = () => {
  confirm.require({
    message: 'Вы желаете удалить публикацию?',
    header: 'Предупреждение',
    icon: 'pi pi-times-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      const response = await PostsService.delete(post.value!._id);
      if (response) {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Публикация удалена', life: 5000 });
        router.push({ name: "PostsFetch" });
      }
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Отмена', detail: 'Отмена удаления публикации', life: 5000 });
    }
  });
};

onBeforeMount(async () => {
  if (store.checkPermission("posts", "get")) {
    getPost();
  } else {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: "Доступ запрещен!", life: 5000 });
    router.push({ name: "Home" });
  }
});

</script>
