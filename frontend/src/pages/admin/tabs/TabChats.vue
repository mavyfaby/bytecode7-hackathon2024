<template>
  <div class="w-full">
    <div class="flex justify-between items-center flex-col lg:flex-row gap-3 mb-3">
      <div class="flex items-center gap-3 text-2xl font-medium text-on-surface-variant mb-3 lg:mb-0">
        <h2>Chats</h2>
      </div>
    </div>
    <div>
      <div class="flex gap-4">
        <div class="w-[500px] flex flex-col gap-4">
          <CardUser
            v-for="user in users"
            :key="user.id"
            :user="user"
            @click="onUserClick(user)"
            role="button"
          />
        </div>
        <div class="flex items-center justify-center flex-grow w-full">
          <div class="flex flex-col h-full w-full" v-if="selectedUser">
            <div>
              <h2 class="text-3xl font-medium">{{ selectedUser.first_name }} {{ selectedUser.last_name }}</h2>
              <p class="text-outline">{{ selectedUser.phone_number }}</p>
            </div>
            <div class="flex-grow text-center flex items-center justify-center">
              Chat conversations here...
            </div>
            <div class="flex items-center gap-3">
              <input class="chat-input" type="text" placeholder="Your message here..." />
              <md-icon-button @click="send">
                <md-icon>send</md-icon>
              </md-icon-button>
            </div>
          </div>
          <p v-else class="text-center">Please select conversation</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import CardUser from '~/components/CardUser.vue';

const users = ref<ApplicantModel[]>([
  {
    id: 1,
    first_name: 'John',
    last_name: 'Doe',
    birthdate: '1990-01-01',
    email: 'john@gmail.com',
    phone_number: '+1234567890',
    fields: [1, 2, 3],
  },
  {
    id: 2,
    first_name: 'Jane',
    last_name: 'Doe',
    birthdate: '1990-01-01',
    email: 'jane@gmail.com',
    phone_number: '+1234567890',
    fields: [1, 2, 3],
  }
]);

const chats = ref<any[]>([]);
const selectedUser = ref<ApplicantModel | null>(null);

function onUserClick(user: ApplicantModel) {
  selectedUser.value = user;
}

function send() {
  
}
</script>

<style lang="scss">
.chat-input {
  @apply rounded-full bg-surface-container p-5 outline-none flex-grow;
}
</style>