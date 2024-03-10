<template>
  <div class="flex justify-content-center">
    <pCard :pt="{ root: { class: 'sm:col-12 md:col-8 lg:col-6 xl:col-4 mb-3' } }">
      <template #title>
        <div class="grid">
          <div class="col-6">Логин</div>
          <pDivider />
        </div>
      </template>
      <template #content>
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="title">Логин</label>
            <pInputText id="title" v-model="name" type="text" :class="{ 'p-invalid': !nameState }" />
            <small v-if="!nameState" class="p-error fadeinup animation-duration-200" id="text-error">Логин
              обязателен</small>
          </div>
          <div class="field col-12">
            <label for="description">Пароль</label>
            <pInputText id="description" v-model="password" type="password" :class="{ 'p-invalid': !passwordState }" />
            <small v-if="!passwordState" class="p-error fadeinup animation-duration-200" id="text-error">Пароль
              длиной не менее 6 символов</small>
          </div>
          <div class="field col-6">
            <pButton label="Войти" severity="primary" @click="onSubmit()" />
          </div>
          <div class="field col-6">
            <router-link :to="{ name: 'UserRegistration' }">
              <pButton label="Регистрация" severity="success" />
            </router-link>
          </div>
        </div>
      </template>
    </pCard>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import UsersService from "@/services/UsersService";
import type { LoginUserDto } from "@/services/dto/users.dto";

const emit = defineEmits(["update-menu"]);

const router = useRouter();
const toast = useToast();

const name = ref("");
const password = ref("");

const nameState = computed(() => (name.value.length >= 1 ? true : false));
const passwordState = computed(() => (password.value.length >= 6 ? true : false));
const formState = computed(() => (nameState.value && passwordState.value));

const onSubmit = async () => {
  if (formState) {
    const user: LoginUserDto = {
      username: name.value,
      password: password.value,
    };

    const response = await UsersService.loginUser(user);
    console.log("login response:", response)
    if (response) {
      window.localStorage.setItem("auth", response.access_token);
      await UsersService.checkLogin();
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Выполнен вход в систему', life: 5000 });
      emit("update-menu");
      router.push({ name: "Home" });
    } else {
      toast.add({ severity: 'error', summary: 'Ошибка', detail: "Неверное имя пользователя или пароль", life: 5000 });
    }
  }
};

</script>
