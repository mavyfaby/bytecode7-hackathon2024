<template>
  <div class="flex justify-center items-center flex-col mt-5 gap-5">
    <h5 class="text-2xl font-bold">Signup</h5>
    <div class="w-full xl:w-1/2">
      <VStepper :items="items" :active-index="activeStep" />

      <Transition name="slide-fade" mode="out-in">
        <div v-if="activeStep === 0">
          <div class="flex justify-center items-stretch flex-col mt-8 gap-4">
            <p class="text-sm text-center">Please fill in all fields marked with *</p>
            <md-filled-text-field label="First Name *" v-model.trim="firstName">
              <md-icon slot="leading-icon">person</md-icon>
            </md-filled-text-field>
            <md-filled-text-field label="Middle Name" v-model.trim="middleName">
              <md-icon slot="leading-icon">person</md-icon>
            </md-filled-text-field>
            <md-filled-text-field label="Last Name *" v-model.trim="lastName">
              <md-icon slot="leading-icon">person</md-icon>
            </md-filled-text-field>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <md-filled-text-field label="Email *" v-model.trim="email" type="email">
                <md-icon slot="leading-icon">mail</md-icon>
              </md-filled-text-field>
              <md-filled-text-field label="Phone *" v-model.trim="phone" type="tel">
                <md-icon slot="leading-icon">phone</md-icon>
              </md-filled-text-field>
            </div>

            <md-filled-text-field label="Birthdate *" v-model.trim="birthdate" type="date">
              <md-icon slot="leading-icon">calendar_today</md-icon>
            </md-filled-text-field>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <md-filled-text-field label="Password *" v-model.trim="password" type="password">
                <md-icon slot="leading-icon">key</md-icon>
              </md-filled-text-field>
              <md-filled-text-field label="Confirm Password *" v-model.trim="confirmPassword" type="password">
                <md-icon slot="leading-icon">key</md-icon>
              </md-filled-text-field>
            </div>

            <div class="flex justify-end">
              <md-filled-button @click="onStep2" :disabled="!canNext">Next</md-filled-button>
            </div>
          </div>
        </div>
        <div v-else-if="activeStep === 1">
          <div class="flex justify-center items-stretch flex-col mt-8 gap-4 mb-5">
            <h5 class="text-center text-secondary font-medium mb-10">Select your job field</h5>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" ref="selectedFields">
              <label v-for="field in fields" :key="field.field_id" class="flex items-center">
                <md-checkbox touch-target="wrapper" :value="field.field_id" />
                {{ field.name }}
              </label>
            </div>
          </div>

          <div class="flex justify-between mt-12">
            <md-outlined-button @click="activeStep--">Prev</md-outlined-button>
            <md-filled-button @click="onRegister">Register</md-filled-button>
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { Endpoints, makeRequest } from "~/network/request";
import { isEmail } from "~/utils/string";

import VStepper from '~/components/VStepper.vue';

const activeStep = ref(0);
const firstName = ref("");
const middleName = ref("");
const lastName = ref("");
const email = ref("");
const phone = ref("");
const birthdate = ref("");
const password = ref("");
const confirmPassword = ref("");
const selectedFields = ref();

const canNext = computed(() => {
  return firstName.value && lastName.value && email.value && phone.value && birthdate.value && password.value && confirmPassword.value;
});

const items = ["Personal Info", "Job Info"];
const fields = [
  { field_id: 1, name: "IT" },
  { field_id: 2, name: "Engineering" },
  { field_id: 3, name: "Accounting" },
  { field_id: 4, name: "Marketing" },
  { field_id: 5, name: "Sales" },
  { field_id: 6, name: "Customer Service" },
  { field_id: 7, name: "Human Resources" },
  { field_id: 8, name: "Healthcare" },
  { field_id: 9, name: "Education" },
];

const router = useRouter();

function onStep2() {
  if (!isEmail(email.value)) {
    toast.info("Invalid email address");
    return;
  }

  if (password.value !== confirmPassword.value) {
    toast.info("Passwords do not match");
    return;
  }

  activeStep.value++;
}

function onRegister() {
  // Get selected fields/
  const fields = Array.from(selectedFields.value.querySelectorAll("md-checkbox"))
    .filter((c: any) => c.checked)
    .map((c: any) => c.value);

  // Check if no fields selected
  if (fields.length === 0) {
    toast.info("Please select at least one field");
    return;
  }
  
  // Construct data
  const data = {
    first_name: firstName.value,
    middle_name: middleName.value,
    last_name: lastName.value,
    email: email.value,
    phone: phone.value,
    password: password.value,
    birthdate: birthdate.value,
    fields: fields
  };

  makeRequest("POST", Endpoints.applicant_register, data, response => {
    if (response.success) {
      toast.success("Account created successfully!");
      router.push("/login");
      return;
    }
    
    toast.error(response.message);
  });
}
</script>

<style lang="scss" scoped></style>