<template>
  <div class="card mb-3" style="padding-top: 1.5rem;">
    <pDataView v-if="!loading && posts.length > 0" :value="posts" :layout="layout" paginator :rows="3"
      :pt="{ header: { class: 'p-0', style: 'border-top-width: 0px;' } }">
      <template #header>
        <div class="flex">
          <div class="flex flex-shrink-0 justify-content-start">
            <h2>Публикации</h2>
          </div>
          <div class="flex flex-grow-1 justify-content-end ">
            <router-link v-if="store.checkPermission('posts', 'fetch')" :to="{ name: 'PostAdd' }">
              <pButton icon="pi pi-plus" aria-label="Добавить публикацию" v-tooltip.left="'Добавить публикацию'" rounded
                size="small" :pt="{
                  root: { class: 'mr-3' }
                }" />
            </router-link>
            <pDataViewLayoutOptions v-model="layout" />
          </div>
        </div>
      </template>

      <template #list="slotProps">
        <div class="col-12 mt-3">
          <div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
            <img v-if="slotProps.data.filename"
              class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
              :src="store.getImagePath(slotProps.data._id)" :alt="slotProps.data.title" />
            <div
              class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
              <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                <div class="text-2xl font-bold text-900">{{ slotProps.data.title }}</div>
                <div class="flex align-items-center gap-3">
                  <span class="flex align-items-center gap-2">
                    <i class="pi pi-tag"></i>
                    <span class="font-semibold">{{ slotProps.data.category.name }}</span>
                  </span>
                </div>
                <div class="flex align-items-center gap-3">
                  <router-link v-if="store.checkPermission('posts', 'get')"
                    :to="{ name: 'PostView', params: { id: slotProps.data._id } }">
                    <pButton label="Просмотр" />
                  </router-link>
                  <router-link v-if="store.checkPermission('posts', 'put')"
                    :to="{ name: 'PostEdit', params: { id: slotProps.data._id } }">
                    <pButton label="Изменить" severity="success" />
                  </router-link>
                  <pButton v-if="store.checkPermission('posts', 'delete')" @click="deletePost(slotProps.data._id)"
                    label="Удалить" severity="danger" />
                </div>
              </div>
              <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #grid="slotProps">
        <div class="col-12 mt-3 sm:col-6 lg:col-12 xl:col-4 p-2">
          <div class="p-4 border-1 surface-border surface-card border-round">
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <div class="flex align-items-center gap-2">
                <i class="pi pi-tag"></i>
                <span class="font-semibold">{{ slotProps.data.category.name }}</span>
              </div>
            </div>
            <div class="flex flex-column align-items-center gap-3 py-5">
              <img v-if="slotProps.data.filename" class="w-9 shadow-2 border-round"
                :src="store.config.postImagePath + slotProps.data.filename" :alt="slotProps.data.title" />
              <div class="text-2xl font-bold">{{ slotProps.data.title }}</div>
              <div class="flex gap-3">
                <router-link v-if="store.checkPermission('posts', 'get')"
                  :to="{ name: 'PostView', params: { id: slotProps.data._id } }">
                  <pButton label="Просмотр" />
                </router-link>
                <router-link v-if="store.checkPermission('posts', 'put')"
                  :to="{ name: 'PostEdit', params: { id: slotProps.data._id } }">
                  <pButton label="Изменить" severity="success" />
                </router-link>
                <pButton v-if="store.checkPermission('posts', 'delete')" @click="deletePost(slotProps.data._id)"
                  label="Удалить" severity="danger" />
              </div>
            </div>
            <div class="flex align-items-center gap-3">
            </div>
          </div>
        </div>
      </template>
    </pDataView>
  </div>
</template>

<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import { useMainStore } from "@/store/MainStore";
import PostsService from "@/services/PostsService";
import type { CategoryDto, PostDto } from "@/services/dto/posts.dto";


const store = useMainStore();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const layout = ref('grid');
const loading = ref(true);

const posts = ref<PostDto[]>([]);
const categories = ref<CategoryDto[]>([]);

onBeforeMount(async () => {
  if (store.checkPermission("posts", "fetch")) {
    getPosts();
  } else {
    confirm.require({
      header: 'Беда в PostsFetch - onBeforeMount!!!',
      message: 'Доступ запрещен!',
      icon: 'pi pi-exclamation-triangle',
      acceptClass: 'p-button-danger',
      accept: () => {
        router.push({ name: "Home" });
      },
    });
  }
});

const getPosts = async () => {
  const response = await PostsService.fetch();
  if (response) {
    posts.value = response.posts;
    categories.value = response.categories;
    loading.value = false;
  }
};

const deletePost = (value: string) => {
  confirm.require({
    message: 'Вы желаете удалить публикацию?',
    header: 'Предупреждение',
    icon: 'pi pi-times-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      const response = await PostsService.delete(value);
      if (response) {
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Публикация удалена', life: 5000 });
        getPosts();
      }
    },
    reject: () => {
      toast.add({ severity: 'warn', summary: 'Отмена', detail: 'Отмена удаления публикации', life: 5000 });
    }
  });
};

</script>