<template>
  <div class="flex justify-content-center">
    <pCard :pt="{ root: { class: 'sm:col-12 md:col-8 lg:col-6 xl:col-4 mb-3' } }">
      <template #title>
        <div class="grid">
          <div class="col-6">Регистрация</div>
          <pDivider />
        </div>
      </template>
      <template #content>
        <div class="p-fluid formgrid grid">
          <div class="field col-12">
            <label for="name">Имя</label>
            <pInputText id="name" v-model="name" type="text" :class="{ 'p-invalid': !nameState }" />
            <small v-if="!nameState" class="p-error fadeinup animation-duration-200" id="text-error">Имя
              обязательно</small>
          </div>
          <div class="field col-12">
            <label for="email">E-mail</label>
            <pInputText id="email" v-model="email" type="text" :class="{ 'p-invalid': !nameState }" />
            <small v-if="!emailState" class="p-error fadeinup animation-duration-200" id="text-error">E-mail
              обязателен<br /></small>
            <small v-if="!emailCorrect" class="p-error fadeinup animation-duration-200" id="text-error">Некорректный
              E-mail<br /></small>
          </div>
          <div class="field col-12">
            <label for="password">Пароль</label>
            <pInputText id="password" v-model="password" type="password" :class="{ 'p-invalid': !passwordState }" />
            <small v-if="!passwordState" class="p-error fadeinup animation-duration-200" id="text-error">Пароль длиной не
              менее 6 символов</small>
          </div>
          <div class="field col-12">
            <label for="confirm_password">Проверка пароля</label>
            <pInputText id="confirm_password" v-model="confirmPassword" type="password"
              :class="{ 'p-invalid': !confirmPasswordState || !samePasswordState }" />
            <small v-if="!confirmPasswordState" class="p-error fadeinup animation-duration-200" id="text-error">Пароль
              длиной не менее 6 символов<br /></small>
            <small v-if="!samePasswordState" class="p-error fadeinup animation-duration-200" id="text-error">Пароли должны
              совпадать</small>
          </div>
          <div class="field col-6">
            <pButton label="Регистрация" severity="primary" @click="onSubmit()" />
          </div>
          <div class="field col-6">
            <router-link :to="{ name: 'UserLogin' }">
              <pButton label="Логин" severity="success" />
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
import type { CreateUserDto } from "@/services/dto/users.dto";

const emit = defineEmits(["update-menu"]);

const router = useRouter();
const toast = useToast();

const name = ref("Zais");
const email = ref("zais@les.ru");
const password = ref("111111");
const confirmPassword = ref("111111");


const nameState = computed(() => (name.value.length > 0));
const emailState = computed(() => (email.value.length > 0));
const emailCorrect = computed(() => (validEmail(email.value)));
const passwordState = computed(() => (password.value.length >= 6));
const confirmPasswordState = computed(() => (confirmPassword.value.length >= 6));
const samePasswordState = computed(() => (password.value == confirmPassword.value));
const formState = computed(() => (nameState.value && passwordState.value && confirmPasswordState && samePasswordState));

const onSubmit = async () => {
  if (formState) {
    const user: CreateUserDto = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

    const response = await UsersService.createUser(user);

    if (response) {
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Успешная регистрация', life: 5000 });
      emit("update-menu");
      router.push({ name: "UserLogin" });
    }
    /*     } catch (err) {
          console.log(err);
          toast.add({ severity: 'error', summary: 'Ошибка', detail: (err as Error).message, life: 5000 });
        } */
  }
};

const validEmail = (email: string) => {
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

</script>
