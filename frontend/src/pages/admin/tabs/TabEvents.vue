<template>
  <div class="w-full">
    <!-- <div class="flex justify-between items-center flex-col lg:flex-row gap-3 mb-3">
      <div class="flex items-center gap-3 text-2xl font-medium text-on-surface-variant mb-3 lg:mb-0">
        <h2>Events</h2>
        <md-assist-chip label="Add" aria-label="Add event" title="Add event" @click="isDialogOpen = true">
          <md-icon slot="icon">add</md-icon>
        </md-assist-chip>
      </div>
    </div>
    <div>
      <div class="w-full">
        <VTable
          class="w-full"
          :loading="isLoading"
          :headers="headers"
          :data="data.events"
          @edit="onEdit"
          @delete="onDelete"
          hoverable
        >
        </VTable>
      </div>
    </div>

    <DialogEvents @done="fetchEvents" v-model="isDialogOpen" /> -->
  </div>
</template>

<script lang="ts" setup>
// import { ref, onMounted } from 'vue';
// import { useDialog } from '~/store';
// import "@material/web/icon/icon";
// import "@material/web/chips/assist-chip";

// import VTable from '../../../components/VTable.vue';
// import DialogEvents from '~/dialogs/DialogEvents.vue';
// import { Endpoints, makeRequest } from '~/network/request';
// import { toast } from 'vue3-toastify';

// const dialog = useDialog();
// const isDialogOpen = ref(false);
// const isLoading = ref(false);

// const data = ref({
//   total: 0,
//   page: 1,
//   events: [] as any[],
// });

// onMounted(() => {
//   fetchEvents();
// })

// function fetchEvents() {
//   data.value.events = [];

//   makeRequest("GET", Endpoints.get_events, {}, response => {
//     console.log(response);
//     if (response.success) {
//       data.value.events = JSON.parse(response.data);
//       return;
//     }

//     toast.info(response.message);
//   });
// }

// const headers: TableHeader[] = [
//   { id: "id", text: "#" },
//   { id: "name", text: "Title" },
//   { id: "venue", text: "Venue" },
//   { id: "short_description", text: "Short Description" },
//   { id: "max_volunteers", text: "Max Volunteers" },
//   { id: "date", text: "Date" },
//   { id: "time", text: "Time" },
// ];

// function onEdit(event: EventModel) {
//   console.log(event);
// }

// function onDelete(event: EventModel) {
//   let id = dialog.open({
//     title: "Delete Event",
//     message: `Are you sure you want to delete ${event.name}?`,
//     ok: {
//       text: "Delete",
//       click: () => {
//         makeRequest("DELETE", Endpoints.delete_event, { id: event.id }, response => {
//           if (response.success) {
//             fetchEvents();
//             dialog.close(id);
//             toast.success(response.message);
//             return;
//           }

//           toast.error(response.message);
//         });
//       }
//     },
//   });
// }
</script>