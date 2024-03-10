<template>
    <div class="card mb-3 flex flex-column justify-content-center" style="padding-top: 1.5rem;">
        <div class="flex">
            <div class="flex flex-shrink-0 justify-content-start">
                <h2>Справочник - Сотрудники</h2>
            </div>
        </div>

        <pDivider :pt="{ root: { class: 'mt-0' } }" />

        <label for="company">Компании: </label>

        <pDropdown v-model="selectedCompany" :options="companies" optionLabel="name" optionValue="_id"
            placeholder="Выберите компанию" class="w-full lg:w-8 xl:w-6 mb-3" inputId="company" @change="changeCompany()" />

        <pDataTable :value="tableData" editMode="cell" @cell-edit-complete="onCellEditComplete($event)" paginator :rows="2"
            v-model:selection="selected" :filters="filters" :rowsPerPageOptions="[2, 5, 10, 20, 50]"
            tableClass="editable-cells-table" tableStyle="min-width: 50rem" showGridlines
            :pt="{ row: { style: 'height: 58px; ' } }">
            <template #header>
                <div class="flex justify-content-between">
                    <div>
                        <pButton v-if="store.checkPermission('employees', 'post')" label="Добавить" icon="pi pi-plus"
                            severity="success" class="mr-2" @click="openAddDialog" />
                        <pButton v-if="store.checkPermission('employees', 'delete')" label="Удалить" icon="pi pi-trash"
                            severity="danger" :disabled="!selected || !selected.length" @click="confirmDeleteSelected()"
                            class="mr-4" />
                        <pButton
                            v-if="store.checkPermission('employees', 'post') || store.checkPermission('employees', 'delete') || store.checkPermission('employees', 'put')"
                            icon="pi pi-save" label="Сохранить изменения" :disabled="!dataChanged" @click="saveData()" />
                    </div>
                    <div>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search" />
                            <pInputText v-model="filters['global'].value" placeholder="Поиск..." />
                        </span>
                    </div>
                </div>
            </template>
            <pColumn selectionMode="multiple" style="width: 3rem" :exportable="false"></pColumn>
            <pColumn v-for="col of tableColumns" :key="col.field" :field="col.field" :header="col.header"
                :sortable="col.sortable" v-model:style="col.style">
                <template #body="{ data, field }">
                    {{ data[field] }}
                </template>
                <template #editor="{ data, field }">
                    <pInputText v-model="data[field]" autofocus :pt="{ root: { style: 'width: 100%;' } }" />
                </template>
            </pColumn>
        </pDataTable>
    </div>
</template>
  
<script lang="ts" setup>
import { ref, onBeforeMount } from "vue";
import cloneDeep from 'lodash/cloneDeep';
import { useRouter, onBeforeRouteLeave } from "vue-router";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";
import { FilterMatchMode } from 'primevue/api';

import { useMainStore } from "@/store/MainStore";
import type { CompanyDto } from "@/services/dto/companies.dto";
import type { EmployeeDto } from "@/services/dto/employees.dto";
import type { DataTableCellEditCompleteEvent } from "primevue/datatable";
import EmployeesService from "@/services/EmployeesService";

const store = useMainStore();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const loading = ref(true);
const dataChanged = ref(false);
const companies = ref<CompanyDto[]>();
const tableData = ref<EmployeeDto[]>();

const selected = ref<EmployeeDto[]>();
const selectedCompany = ref("");

const tableColumns = ref([
    { field: 'name', header: 'Фамилия, имя, отчество', sortable: true, style: 'width: 60%;' },
    { field: 'name_short', header: 'Ф.И.О.', sortable: false, style: 'width: 40%;' },
]);

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    'company._id': { value: "", matchMode: FilterMatchMode.EQUALS },
});

const getEmployees = async () => {
    const response = await EmployeesService.fetch();

    if (response) {
        companies.value = <CompanyDto[]>cloneDeep(response.companies);
        if (companies.value.length) {
            selectedCompany.value = companies.value[0]._id as string;
            tableData.value = <EmployeeDto[]>cloneDeep(response.employees);
            filters.value['company._id'].value = selectedCompany.value;
        }
        loading.value = false;
    }
};

const onCellEditComplete = (event: DataTableCellEditCompleteEvent) => {
    let { data, value, newValue, field } = event;
    if (value != newValue) {
        dataChanged.value = true;
        data[field] = newValue.trim();
        if (field == "name" && data["name_short"] == "") {
            let sp = newValue.split(" ");
            let sn = "";
            if (sp[0]) {
                sn = sp[0];
                if (sp[1]) {
                    sn = sn + " " + sp[1].substring(0, 1) + ".";
                    if (sp[2]) {
                        sn = sn + " " + sp[2].substring(0, 1) + ".";
                    }
                }
            }
            data["name_short"] = sn;
        }
    }
};

const saveData = async () => {
    const response = await EmployeesService.save(tableData.value as EmployeeDto[]);
    if (response) {
        dataChanged.value = false;
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Изменения сохранены', life: 5000 });
    }
};

const changeCompany = async () => {
    filters.value['company._id'].value = selectedCompany.value;
};

const openAddDialog = () => {
    //showNewDialog.value = true;
    let ni: EmployeeDto = { _id: "", name: "", name_short: "", company: { _id: selectedCompany.value, } };
    (tableData.value as EmployeeDto[]).push(ni);
    dataChanged.value = true;
};

const confirmDeleteSelected = () => {
    if (selected.value) {
        selected.value.forEach(item => {
            if (tableData.value) {
                let idx = tableData.value.findIndex(n => n._id == item._id);
                if (idx != -1) {
                    tableData.value.splice(idx, 1);
                    dataChanged.value = true;
                }
            }
        })
    }
};

onBeforeMount(async () => {
    if (store.checkPermission("employees", "fetch")) {
        getEmployees();
    } else {
        confirm.require({
            header: 'Беда в RefEmployees - onBeforeMount!!!',
            message: 'Доступ запрещен!',
            icon: 'pi pi-exclamation-triangle',
            acceptClass: 'p-button-danger',
            accept: () => {
                router.push({ name: "Home" });
            },
        });
    }
});

onBeforeRouteLeave((to, from, next) => {
    if (dataChanged.value) {
        confirm.require({
            message: 'У вас остались несохраненные данные. Вы желаете уйти со страницы?',
            header: 'Предупреждение',
            icon: 'pi pi-times-circle',
            acceptClass: 'p-button-danger',
            accept: () => {
                next();
            },
            reject: () => {
                next(false);
            }
        });
    } else {
        next();
    }
});


</script>
