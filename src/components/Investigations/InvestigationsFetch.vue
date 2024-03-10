<template>
    <div class="card mb-3" style="padding-top: 1.5rem;">
        <pDataView v-if="!loading && invs.length > 0" :value="invs" :layout="layout" paginator :rows="3"
            :pt="{ header: { class: 'p-0', style: 'border-top-width: 0px;' } }">
            <template #header>
                <div class="flex">
                    <div class="flex flex-shrink-0 justify-content-start">
                        <h2>Расследования</h2>
                    </div>
                    <div class="flex flex-grow-1 justify-content-end ">
                        <router-link v-if="store.checkPermission('investigations', 'post')"
                            :to="{ name: 'InvestigationAdd' }">
                            <pButton icon="pi pi-plus" aria-label="Новоое расследование"
                                v-tooltip.left="'Новоое расследование'" rounded size="small" :pt="{
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
                        <img v-if="slotProps.data.image"
                            class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
                            :src="`${store.config.siteURL}/images/${slotProps.data.image}`" :alt="slotProps.data.title" />
                        <div
                            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div class="text-2xl font-bold text-900">{{ slotProps.data.title }}</div>
                                <div class="flex align-items-center gap-3"></div>
                                <div class="flex align-items-center gap-3">
                                    <router-link v-if="store.checkPermission('investigations', 'get')"
                                        :to="{ name: 'InvestigationView', params: { id: slotProps.data._id } }">
                                        <pButton label="Просмотр" />
                                    </router-link>
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
                        <div class="flex flex-wrap align-items-center justify-content-between gap-2"></div>
                        <div class="flex flex-column align-items-center gap-3 py-5">
                            <img v-if="slotProps.data.image" class="w-9 shadow-2 border-round"
                                :src="`${store.config.siteURL}/images/${slotProps.data.image}`"
                                :alt="slotProps.data.title" />
                            <div class="text-2xl font-bold">{{ slotProps.data.title }}</div>
                            <div> Компания: {{ slotProps.data.company.name }}</div>
                            <div class="flex gap-3">
                                <router-link v-if="store.checkPermission('investigations', 'get')"
                                    :to="{ name: 'InvestigationView', params: { id: slotProps.data._id } }">
                                    <pButton label="Просмотр" />
                                </router-link>
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
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";

import { useMainStore } from "@/store/MainStore";
import InvestigationsService from "@/services/InvestigationsService";
import type { InvestigationDto } from "@/services/dto/investigations.dto";

const store = useMainStore();
const router = useRouter();
const toast = useToast();

const invs = ref<InvestigationDto[]>([]);
const layout = ref('grid');
const loading = ref(true);


const getInvs = async () => {
    InvestigationsService.fetch(
        result => {
            invs.value = result;
            loading.value = false;
        },
        error => {
            toast.add({ severity: 'error', summary: 'Ошибка', detail: error.message, life: 5000 });
            router.push({ name: "Home" });
        }
    );
};

onMounted(async () => {
    if (store.checkPermission("investigations", "fetch")) {
        getInvs();
    } else {
        toast.add({ severity: 'error', summary: 'Ошибка', detail: "Доступ запрещен!", life: 5000 });
        router.push({ name: "Home" });
    }
});


</script>
  
<style scoped></style>
