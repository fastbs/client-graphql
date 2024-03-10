<template>
    <div class="card mb-3 flex flex-column justify-content-center" style="padding-top: 1.5rem;">
        <div class="flex">
            <div class="flex flex-shrink-0 justify-content-start">
                <h2>Справочник - Компании</h2>
            </div>
        </div>

        <pDivider :pt="{ root: { class: 'mt-0' } }" />

        <pDataTable :value="tableData" editMode="cell" @cell-edit-complete="onCellEditComplete($event)" paginator :rows="2"
            v-model:selection="selected" :filters="filters" :rowsPerPageOptions="[2, 5, 10, 20, 50]"
            tableClass="editable-cells-table" tableStyle="min-width: 50rem" showGridlines
            :pt="{ row: { style: 'height: 58px; ' } }">
            <template #header>
                <div class="flex justify-content-between">
                    <div>
                        <pButton v-if="store.checkPermission('companies', 'post')" label="Добавить" icon="pi pi-plus"
                            severity="success" class="mr-2" @click="openAddDialog" />
                        <pButton v-if="store.checkPermission('companies', 'delete')" label="Удалить" icon="pi pi-trash"
                            severity="danger" :disabled="!selected || !selected.length" @click="confirmDeleteSelected()"
                            class="mr-4" />
                        <pButton
                            v-if="store.checkPermission('companies', 'post') || store.checkPermission('companies', 'delete') || store.checkPermission('companies', 'put')"
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
                    <!-- {{ field === 'price' ? formatCurrency(data[field]) : data[field] }} -->
                    {{ data[field] }}
                </template>
                <template #editor="{ data, field }">
                    <pInputText v-model="data[field]" autofocus :pt="{ root: { style: 'width: 100%;' } }" />
                    <!--                     <template v-if="field !== 'inn'">
                        <pInputText v-model="data[field]" autofocus :pt="{ root: { style: 'width: 100%;' } }" />
                    </template>
                    <template v-else>
                        <pInputNumber v-model="data[field]" autofocus :pt="{ root: { style: 'width: 100%;' } }" />
                    </template>
 -->
                </template>
            </pColumn>
            <!--             <pColumn :exportable="false" style="min-width:8rem">
                <template #body="slotProps">
                    <pButton icon="pi pi-pencil" outlined rounded class="mr-2" @click="editData(slotProps.data)" />
                    <pButton icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDelete(slotProps.data)" />
                </template>
            </pColumn> -->
        </pDataTable>

        <pDialog v-model:visible="showNewDialog" :style="{ width: '450px' }" header="Product Details" :modal="true"
            class="p-fluid">
            <!--             <img v-if="product.image" :src="`https://primefaces.org/cdn/primevue/images/product/${product.image}`"
                :alt="product.image" class="block m-auto pb-3" />
            <div class="field">
                <label for="name">Name</label>
                <InputText id="name" v-model.trim="product.name" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !product.name }" />
                <small class="p-error" v-if="submitted && !product.name">Name is required.</small>
            </div>
            <div class="field">
                <label for="description">Description</label>
                <Textarea id="description" v-model="product.description" required="true" rows="3" cols="20" />
            </div>

            <div class="field">
                <label for="inventoryStatus" class="mb-3">Inventory Status</label>
                <Dropdown id="inventoryStatus" v-model="product.inventoryStatus" :options="statuses" optionLabel="label"
                    placeholder="Select a Status">
                    <template #value="slotProps">
                        <div v-if="slotProps.value && slotProps.value.value">
                            <Tag :value="slotProps.value.value" :severity="getStatusLabel(slotProps.value.label)" />
                        </div>
                        <div v-else-if="slotProps.value && !slotProps.value.value">
                            <Tag :value="slotProps.value" :severity="getStatusLabel(slotProps.value)" />
                        </div>
                        <span v-else>
                            {{ slotProps.placeholder }}
                        </span>
                    </template>
                </Dropdown>
            </div>

            <div class="field">
                <label class="mb-3">Category</label>
                <div class="formgrid grid">
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category1" name="category" value="Accessories" v-model="product.category" />
                        <label for="category1">Accessories</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category2" name="category" value="Clothing" v-model="product.category" />
                        <label for="category2">Clothing</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category3" name="category" value="Electronics" v-model="product.category" />
                        <label for="category3">Electronics</label>
                    </div>
                    <div class="field-radiobutton col-6">
                        <RadioButton id="category4" name="category" value="Fitness" v-model="product.category" />
                        <label for="category4">Fitness</label>
                    </div>
                </div>
            </div>

            <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Price</label>
                    <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
                </div>
                <div class="field col">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="product.quantity" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancel" icon="pi pi-times" text @click="hideDialog" />
                <Button label="Save" icon="pi pi-check" text @click="saveProduct" />
            </template> -->
        </pDialog>



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
import type { DataTableCellEditCompleteEvent } from "primevue/datatable";
import CompaniesService from "@/services/CompaniesService";

const store = useMainStore();
const router = useRouter();
const confirm = useConfirm();
const toast = useToast();

const loading = ref(true);
const dataChanged = ref(false);
const showNewDialog = ref(false);
const tableData = ref<CompanyDto[]>();
const selected = ref<CompanyDto[]>();
const tableColumns = ref([
    { field: 'name', header: 'Наименование', sortable: true, style: 'width: 45%;' },
    { field: 'name_short', header: 'Краткое наименование', sortable: false, style: 'width: 30%;' },
    { field: 'inn', header: 'ИНН', sortable: true, style: 'width: 25%;' },
]);
const filters = ref({
    'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
});


const getCompanies = async () => {
    const response = await CompaniesService.fetch();
    if (response) {
        tableData.value = <CompanyDto[]>cloneDeep(response);
        loading.value = false;
    }
};

const onCellEditComplete = (event: DataTableCellEditCompleteEvent) => {
    let { data, value, newValue, field } = event;
    if (value != newValue) {
        dataChanged.value = true;
        data[field] = newValue.trim();
        /*         switch (field) {
                    case 'inn':
                        data[field] = Number(newValue);
                        break;
        
                    default:
                        data[field] = newValue.trim();
                        break;
                } */
    }
};

const saveData = async () => {
    const response = await CompaniesService.save(tableData.value as CompanyDto[]);
    if (response) {
        dataChanged.value = false;
        toast.add({ severity: 'success', summary: 'Успешно', detail: 'Изменения сохранены', life: 5000 });
    }
};

const openAddDialog = () => {
    //showNewDialog.value = true;
    let ni: CompanyDto = { name: "", name_short: "", inn: "" };
    (tableData.value as CompanyDto[]).push(ni);
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
    if (store.checkPermission("companies", "fetch")) {
        getCompanies();
    } else {
        confirm.require({
            header: 'Беда в RefCompanies - onBeforeMount!!!',
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
