<template>
  <div class="container mx-auto px-6 py-12 flex items-center">
    <div class="flex items-center justify-center w-full h-full">
      <div class="mt-8">
        <h2 class="text-2xl md:text-3xl font-semibold mb-1 text-on-surface-variant">
          Admin
        </h2>
        <h6 class="text-sm">
          Unauthorized access is prohibited.
        </h6>

        <div class="flex flex-col gap-1 mt-6 mb-6">
          <md-outlined-text-field
            :disabled="isLoggingIn"
            label="Username"
            type="text"
            maxLength="8"
            hasLeadingIcon="true"
            @keydown.enter="login"
            v-model.trim="username"
          >
            <md-icon slot="leading-icon">badge</md-icon>
          </md-outlined-text-field>

          <md-outlined-text-field
            :disabled="isLoggingIn"
            label="Password"
            :type="isPasswordVisible ? 'text' : 'password'"
            v-model.trim="password"
            @keydown.enter="login"
          >
            <md-icon slot="leading-icon">lock</md-icon>
            <md-icon-button slot="trailing-icon" tabindex="-1" @click="isPasswordVisible = !isPasswordVisible" toggle>
              <md-icon>visibility_off</md-icon>
              <md-icon slot="selected">visibility</md-icon>
            </md-icon-button>
          </md-outlined-text-field>
        </div>

        <div class="flex justify-end">
          <md-filled-button @click="login" class="w-1/3" :disabled="isLoggingIn">
            {{ isLoggingIn ? 'Logging in...' : 'Login' }}
          </md-filled-button>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStore } from '~/store';
import { useRouter } from 'vue-router';
import { Endpoints, makeRequest } from '~/network/request';
import { setStore } from '~/utils/storage';
import { toast } from 'vue3-toastify';

const isLoggingIn = ref(false);
const isPasswordVisible = ref(false);

const username = ref('');
const password = ref('');

const store = useStore();
const router = useRouter();

function login() {
  store.isLoading = true;

  makeRequest("POST", Endpoints.admin_login, {
    username: username.value,
    password: password.value,
  }, response => {
    store.isLoading = false;
    console.log(response);

    if (response.Success) {
      setStore("admin", response.data);
      router.replace("/admin/events");
      return;
    }

    toast.error(response.message);
  });
}
</script>