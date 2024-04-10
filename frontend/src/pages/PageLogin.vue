<template>
  <div class="container mx-auto px-6 py-12 flex items-center">
    <div class="flex items-center justify-center w-full h-full">
      <div class="mt-8">
        <h2 class="text-2xl md:text-3xl font-semibold mb-1 text-on-surface-variant">
          Welcome!
        </h2>
        <h6 class="text-sm">
          To login, please enter your credentials.
        </h6>

        <div class="flex flex-col gap-5 mt-6 mb-6">
          <md-outlined-text-field
            :disabled="isLoggingIn"
            label="Email"
            type="email"
            hasLeadingIcon="true"
            @keydown.enter="login"
            v-model.trim="username"
          >
            <md-icon slot="leading-icon">mail</md-icon>
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

        <div class="flex justify-between items-center my-3">
          <label class="flex items-center gap-3 text-sm">
            <md-checkbox @change="isRememberMe = !isRememberMe" :checked="isRememberMe" :disabled="isLoggingIn" />
            Remember Me
          </label>
        </div>

        <div class="flex justify-end">
          <md-filled-button @click="login" class="w-1/3" :disabled="isLoggingIn">
            {{ isLoggingIn ? 'Logging in...' : 'Login' }}
          </md-filled-button>
        </div>

        <div class="flex items-center justify-center gap-2 mt-4">
          <p class="text-sm">Don't have an account yet?</p>
          <router-link to="/signup">
            <md-text-button>Signup</md-text-button>
          </router-link>
        </div>

      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { toast } from 'vue3-toastify';
import { useStore } from '~/store';
import { Endpoints, makeRequest } from '~/network/request';

const isRememberMe = ref(false);
const isLoggingIn = ref(false);
const isPasswordVisible = ref(false);
const store = useStore();

const username = ref('');
const password = ref('');

function login() {
  if (!username.value || !password.value) {
    toast.error('Please enter your email and password.');
    return;
  }

  store.isLoading = true;

  makeRequest("POST", Endpoints.applicant_login, {
    email: username.value,
    password: password.value,
  }, response => {
    store.isLoading = false;
    
    if (response.success) {
      return;
    }

    toast.error(response.message);
  });
}
</script>