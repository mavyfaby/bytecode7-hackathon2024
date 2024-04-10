<template>
  <div class="flex mt-5 h-full transition-[padding_0.21s_ease_in_out]">
    <Transition name="slide-fade" mode="out-in">
      <TabEvents v-if="route.params.tab === 'events'" />
      <TabUsers v-else-if="route.params.tab === 'users'" />
      <TabChats v-else-if="route.params.tab === 'chats'" />
    </Transition>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue';
import { useStore } from '../../store';
import { useRouter, useRoute } from 'vue-router';

import TabChats from './tabs/TabChats.vue';
import TabEvents from './tabs/TabEvents.vue';
import TabUsers from './tabs/TabUsers.vue';

const store = useStore();
const router = useRouter();
const route = useRoute();

store.selectedRail = router.currentRoute.value.params.tab as string;

watch(() => store.selectedRail, tab => {
  router.push({ name: "Admin", params: { tab }});
});
</script>