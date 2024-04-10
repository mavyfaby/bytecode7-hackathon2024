<template>
  <div class="bg-surface-container p-6 rounded-xl flex items-center gap-5 relative" @click="emit('click')">
    <md-ripple />
    <div>
      <md-icon>person</md-icon>
    </div>
    <div class="flex flex-col">
      <h5 class="font-medium">{{ user.first_name }} {{ user.last_name }}</h5>
      <p class="text-outline">{{ user.email }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/ripple/ripple";

defineProps<{
  user: ApplicantModel;
}>();

const emit = defineEmits(["click"]);
</script>