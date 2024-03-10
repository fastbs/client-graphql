<template>
  <div class=" layout-static p-ripple-disabled">
    <div class="layout-topbar">
      <router-link to="/" class="layout-topbar-logo">
        <img :src="`${store.config.siteURL}images/moon.png`" alt="logo" />
        <span>Fastbs Application</span>
      </router-link>
      <pMenubar :model="menu" class="mx-2" />
      <div class="layout-topbar-menu">
        <button class="p-link layout-topbar-button" @click="updateMenu()">
          <i class="pi pi-sync"></i>
          <span>Update Menu</span>
        </button>
      </div>
    </div>
    <div class="layout-main-container">
      <div class="layout-main">
        <pToast />
        <pConfirmDialog />
        <router-view v-if="!loading" @update-menu="updateMenu"></router-view>
      </div>
      <div class="layout-footer">
        <img :src="`${store.config.siteURL}layout/images/logo-dark.svg`" alt="Logo" class="mr-2" height="20"> by
        <span class="font-medium ml-2">PrimeVue</span>
      </div>
    </div>
    <div class="layout-mask"></div>
  </div>
</template>

<script lang="ts" setup>

import { ref, watch, onBeforeMount, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useToast } from "primevue/usetoast";
import type { ToastMessageOptions } from "primevue/toast";

import { socket } from "@/socket";
import { useMainStore } from "@/store/MainStore";
import UsersService from "@/services/UsersService"
import type { Menu2ItemDto } from "@/services/dto/users.dto";
import type { ApolloErrorDto } from "@/services/dto/apolloErrors.dto";

const menu = ref<Menu2ItemDto[]>([]);
const loading = ref(true);

const toast = useToast();
const store = useMainStore();

const { isLogged, toasts, apolloErrors } = storeToRefs(store);

watch(() => isLogged.value, (newValue, prevValue) => {
  console.log(">>> isLogged: ", newValue);
})

watch(() => toasts.value.length, (newValue, prevValue) => {
//  console.log("in watch...")
  let el: ToastMessageOptions | undefined;
  while(el = toasts.value.shift()) {
    toast.add(el);
  }
})

watch(() => apolloErrors.value.length, () => {
  let ae: ApolloErrorDto | undefined;
  while(ae = apolloErrors.value.shift()) {
    const message = `Error in ${ae.operation} !
              Code: ${ae.code}
              Message: ${ae.message}
              `;

    toast.add({ severity: 'error', summary: 'Ошибка', detail: message, life: 5000 });
  }
});


store.count = 3;
socket.off();

const updateMenu = async () => {
  menu.value = await UsersService.getMenu() ?? [];
};

onBeforeMount(async () => {
  await UsersService.checkLogin();
  updateMenu();
  loading.value = false;
});

onMounted(() => {
  store.bindWsEvents();
});

</script>

<style lang="scss" scoped></style>
