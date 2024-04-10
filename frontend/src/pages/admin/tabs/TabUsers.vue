<template>
  <div class="w-full">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-3 mb-3">
      <div class="flex items-center gap-3 text-2xl font-medium text-on-surface-variant mb-3 lg:mb-0">
        <h2>Users</h2>
      </div>
      <div>
        
      </div>
    </div>
    <div>
      <div class="w-full">
        <VTable
          class="w-full"
          :loading="isLoading"
          :headers="headers"
          :data="data.users"
          @edit="onEdit"
          @delete="onDelete"
          hoverable
        >
        </VTable>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import "@material/web/icon/icon";
import "@material/web/chips/assist-chip";

import VTable from '../../../components/VTable.vue';
import { Endpoints, makeRequest } from '~/network/request';
import { toast } from 'vue3-toastify';

const isLoading = ref(false);

onMounted(() => {
  fetchUsers();
});

const data = ref({
  total: 0,
  page: 1,
  users: [] as ApplicantModel[],
});

const headers: TableHeader[] = [
  { id: "id", text: "#" },
  { id: "fist_name", text: "First name" },
  { id: "last_name", text: "Last name" },
  { id: "birthdate", text: "Birthdate" },
  { id: "email", text: "Email" },
  { id: "phone_number", text: "Phone" },
];

function fetchUsers() {
  isLoading.value = true;

  makeRequest("GET", Endpoints.applicants, {}, response => {
    isLoading.value = false;

    if (response.success) {
      // data.value.users = 
      return;
    }

    toast.error(response.message);
  });

}

function onEdit() {

}

function onDelete() {

}
</script>