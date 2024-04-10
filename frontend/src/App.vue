<template>
  <div class="min-h-screen">
    <md-linear-progress class="fixed right-0 left-0 top-0 min-w-full z-[1]" :indeterminate="store.isLoading" />
    <VAppbar title="Hackathon 2024" />
    <VNavigationRail
      :class="{ 'hidden': !route.path.startsWith('/admin'), 'translate-x-0': route.path.startsWith('/admin') && !route.path.endsWith('/login') }"
      class="fixed top-0 bottom-0 -translate-x-[80px]"
      :selected="(route.params.tab as string | undefined) || 'dashboard'"
      :destinations="store.rails"
      @select="id => store.selectedRail = id"
    />
    
    <div class="container mx-auto px-6">
      <router-view v-slot="{ Component }">
        <Transition name="slide-fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </router-view>
    </div>

    <DialogMain v-for="data in dialogs" :key="data.id" :data="data" @close="data.cancel" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch }  from 'vue';
import { useStore, useDialog } from './store';
import { useRoute } from 'vue-router';
import VAppbar from './components/VAppbar.vue';
import VNavigationRail from './components/VNavigationRail.vue';
import DialogMain from './components/dialogs/DialogMain.vue';

const store = useStore();
const route = useRoute();
const dialog = useDialog();

// Queue of dialogs
const dialogs = ref();

// Create rails
const rails: Rail[] = [
  
];

// Set rails
store.rails = rails;

watch(dialog.queue, q => {
  dialogs.value = q;
});
</script>