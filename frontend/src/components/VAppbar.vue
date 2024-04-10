<template>
  <div class="container mx-auto px-6 flex justify-between pt-5">
    <h4 class="font-bold text-primary">{{ title }}</h4>
    <div>
      <md-switch @change="onThemeChange" :selected="store.isDark" icons>
        <md-icon slot="on-icon" class="scale-[0.65]">dark_mode</md-icon>
        <md-icon slot="off-icon" class="scale-[0.65]">light_mode</md-icon>
      </md-switch>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/switch/switch";

import { useStore } from "../store";
import { setDarkMode } from "../utils/theme";

defineProps<{
  title: string
}>();

const store = useStore();

function onThemeChange() {
  store.isDark = !store.isDark;
  setDarkMode(store.isDark);
}
</script>