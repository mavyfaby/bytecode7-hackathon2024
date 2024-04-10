<template>
  <div class="container mx-auto px-6 flex justify-between pt-5 h-[64px]">
    <div class="flex items-center gap-3">
      <!-- Back button -->
      <md-icon-button v-if="store.isShowBackButton" @click="back">
        <md-icon>arrow_back</md-icon>
      </md-icon-button>
      <h4 class="font-bold text-primary">{{ title }}</h4>
    </div>
    <div class="flex gap-2 items-center">

      <router-link to="/">
        <md-text-button>
          Home
        </md-text-button>
      </router-link>

      <div v-if="store.isLoggedIn">
        <md-text-button>
          Profile
        </md-text-button>
        <md-text-button @click="logout">
          Logout
        </md-text-button>
      </div>

      <div v-else>
        <router-link to="/login">
          <md-text-button>
            Login
          </md-text-button>
        </router-link>
      </div>

      <md-switch @change="onThemeChange" :selected="store.isDark" icons>
        <md-icon slot="on-icon" class="scale-[0.65]">dark_mode</md-icon>
        <md-icon slot="off-icon" class="scale-[0.65]">light_mode</md-icon>
      </md-switch>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getHistoryLength } from "~/utils/page";
import { setDarkMode } from "../utils/theme";
import { useStore, useDialog } from "../store";
import { useRouter } from "vue-router";
import { Config } from "~/config";
import { onMounted } from "vue";
import { getStore, removeStore } from "~/utils/storage";

defineProps<{
  title: string
}>();

const store = useStore();
const router = useRouter();
const dialog = useDialog();

onMounted(() => {
  store.isDark = getStore("dark") === "1";
  setDarkMode(store.isDark);
});

function onThemeChange() {
  store.isDark = !store.isDark;
  setDarkMode(store.isDark);
}

function back() {
  router.back();
  store.isShowBackButton = getHistoryLength() - (Config.initialHistoryLength as number) > 0;
}

function logout() {
  const id = dialog.open({
    title: "Logout confirmation",
    message: "This will clear your session data. Are you sure you want to logout?",
    ok: {
      text: "Logout",
      click() {
        removeStore("at");
        removeStore("rt");
        dialog.close(id);
        router.push({ path: "admin/login" });
      }
    },
    cancel:{
      text: "Cancel",
      click() {
        dialog.close(id);
      }
    }
  });
}
</script>