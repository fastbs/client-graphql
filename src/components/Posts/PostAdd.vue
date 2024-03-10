<template>
  <div class="card mb-3 flex flex-column justify-content-center" style="padding-top: 1.5rem;">
    <div class="flex">
      <div class="flex flex-shrink-0 justify-content-start">
        <h2>Публикации</h2>
      </div>
    </div>

    <pDivider :pt="{ root: { class: 'mt-0' } }" />

    <div class="flex justify-content-center">
      <pCard v-if="!loading" :pt="{ root: { class: 'sm:col-12 md:col-12 lg:col-8 xl:col-6 mb-3' } }">
        <template #title>
          <div class="grid">
            <div class="col-6">Добавление публикации</div>
            <div class="col-6 flex flex-wrap justify-content-end gap-3">
              <pButton @click="addPost()" label="Добавить" severity="success" :disabled="!formState" />
            </div>
            <pDivider />
          </div>
        </template>
        <template #content>
          <div class="p-fluid formgrid grid">
            <div class="field col-12">
              <label for="title">Заголовок</label>
              <pInputText id="title" v-model="post.title" type="text" :class="{ 'p-invalid': !titleState }" />
              <small v-if="!titleState" class="p-error fadeinup animation-duration-200" id="text-error">Заголовок длиной
                не менее 5 символов</small>
            </div>
            <div class="field col-12">
              <label for="description">Описание</label>
              <pInputText id="description" v-model="post.description" type="text"
                :class="{ 'p-invalid': !descriptionState }" />
              <small v-if="!descriptionState" class="p-error fadeinup animation-duration-200" id="text-error">Описание
                длиной не менее 5 символов</small>
            </div>
            <div class="field col-12">
              <label for="category">Категория</label>
              <pDropdown v-model="post.category._id" :options="categories" optionLabel="name" optionValue="_id"
                placeholder="Выберите категорию" inputId="category" :class="{ 'p-invalid': !categoryState }" />
              <small v-if="!categoryState" class="p-error fadeinup animation-duration-200" id="text-error">Категория
                обязательна</small>
            </div>
            <div class="field col-12">
              <label for="image">Изображение</label>
              <div>
                <img id="image" :src="post.filename" class="max-h-20rem max-w-full p-1 border-1 border-blue-500"
                  alt="Нет изображения" @click="handleAttachment()" />
              </div>
              <div v-if="postImage.name" class="field col-12">
                <span class="ms-4 mr-2">Имя: {{ postImage.name }}</span>
                <span class="ms-4">Размер: {{ postImage.size }} байт</span>
              </div>
            </div>
            <div class="field col-6">
              <pButton label="Изменить изображение" severity="help" @click="handleAttachment()" />
              <input id="hiddenAttachment" class="hide" type="file" accept="image/*"
                @change.prevent="fileChange($event)" />
              <a id="attachmentAnchor" class="hide" />
            </div>
            <div class="field col-6">
              <pButton label="Удалить изображение" severity="danger" @click="deleteImage()" />
            </div>
          </div>
        </template>
      </pCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import { useMainStore } from "@/store/MainStore";
import PostsService from "@/services/PostsService";
import type { CategoryDto, CreatePostDto } from "@/services/dto/posts.dto";


const store = useMainStore();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const post = ref<CreatePostDto>({
  title: "",
  description: "",
  category: {
    _id: "",
  },
  filename: "",
});
const categories = ref<CategoryDto[]>();
const postImage = ref(new File([""], ""));
const loading = ref(true);

const titleState = computed(() => (post.value.title.length >= 5 ? true : false));
const descriptionState = computed(() => (post.value.description!.length >= 5 ? true : false));
const categoryState = computed(() => (post.value.category._id != "" ? true : false));
const formState = computed(() => (titleState.value && descriptionState.value && categoryState.value));


const addPost = async () => {
  if (formState) {
    const response = await PostsService.create(post.value);
    if (response) {
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Публикация добавлена', life: 5000 });
      if (postImage.value.size) {
        let formData = new FormData();
        formData.append("attachment", postImage.value);
        try {
          await PostsService.setImage(response._id, formData);
          toast.add({ severity: 'success', summary: 'Успешно', detail: 'Изображение добавлено', life: 5000 });
        } catch (err) {
          toast.add({ severity: 'error', summary: 'Ошибка', detail: (err instanceof Error) ? err.message : "", life: 5000 });
        }
      }
      router.push({ name: "PostsFetch" });
    }
  }
};

const handleAttachment = () => {
  let node = document.getElementById("hiddenAttachment");
  if (node != null) {
    node.click();
  }
};

const fileChange = async (event: Event) => {
  if (event.target != null) {
    let vr = (event.target as HTMLInputElement)
    if (vr.files != null) {
      postImage.value = vr.files[0];
      let image = document.getElementById("image") as HTMLImageElement;
      if (image != null) {
        image.src = URL.createObjectURL(vr.files[0])
      }
    }
  }
}

const deleteImage = () => {
  post.value.filename = "";
  postImage.value = new File([""], "");
  let image = document.getElementById("image") as HTMLImageElement;
  image.src = "";
}

onBeforeMount(async () => {
  if (store.checkPermission("posts", "post")) {
    const response = await PostsService.getCategories();
    if (response) {
      categories.value = response;
      loading.value = false;
    }
  } else {
    toast.add({ severity: 'error', summary: 'Ошибка', detail: "Доступ запрещен!", life: 5000 });
    router.push({ name: "Home" });
  }
});

</script>

<style scoped>
.hide {
  position: absolute;
  top: -9999px;
  left: -9999px;
}
</style>