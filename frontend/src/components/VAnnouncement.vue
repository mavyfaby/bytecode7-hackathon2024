<template>
  <div class="bg-surface-container-low dark:bg-surface-container rounded-2xl p-6">
    <div class="flex items-center gap-3">
      <md-icon class="verified">verified</md-icon>
      <h3 class="font-medium text-primary mb-1">{{ data.title }}</h3>
    </div>
    <div class="text-sm">
      {{ data.content }}
    </div>

    <div class="flex justify-start items-center mt-5">
      <h6 class="text-xs">{{ getReadableDate(data.date_stamp) }}</h6>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getReadableDate } from '~/utils/date';

defineProps<{
  data: AnnouncementModel
}>();
</script>

<style lang="scss" scoped>
md-icon.verified {
  @apply text-primary;
  --md-icon-size: 14px;
}
</style>