<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

import UsersService from "@/services/UsersService";

const emit = defineEmits(["update-menu"]);

const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

onMounted(() => {
  confirm.require({
    message: 'Вы желаете выйти из системы?',
    header: 'Предупреждение',
    icon: 'pi pi-times-circle',
    acceptClass: 'p-button-danger',
    accept: async () => {
      window.localStorage.removeItem("auth");
      await UsersService.checkLogin();
      emit("update-menu");
      toast.add({ severity: 'success', summary: 'Успешно', detail: 'Выполнен выход из системы', life: 5000 });
      router.push({ name: "Home" });
    },
    reject: () => {
      toast.add({ severity: 'error', summary: 'Отмена', detail: 'Выхода из системы отменен', life: 5000 });
      window.history.length > 1 ? router.go(-1) : router.push({ name: "Home" });
    }
  });
});

</script>
