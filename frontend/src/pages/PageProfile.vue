<template>
  <div class="container mx-auto px-6 h-full flex flex-col pt-6 items-center">
    <md-icon class="dp float-anim" v-html="icon('deployed_code')" />
    <h3 class="name">{{ tatakform.student.first_name }} {{ tatakform.student.last_name }}</h3>
    <h5 class="sub">{{ tatakform.student.email_address }}</h5>
    <div class="my-3" />
    <div class="flex flex-col gap-5 justify-center w-full sm:w-3/4 lg:w-1/2 xl:w-1/3">
      <div class="card" title="This is field is not editable">
        <h4>Student ID</h4>
        <span>{{ tatakform.student.student_id }}</span>
      </div>
      <div class="card" title="This is field is not editable">
        <h4>Course & Year</h4>
        <span>{{ getCourseFromCourseID(tatakform.colleges, tatakform.student.course_id)?.acronym }} - {{ tatakform.student.year_level }}</span>
      </div>
      <div class="card" title="This is field is not editable">
        <h4>College</h4>
        <span>{{ getCollegeFromCourseID(tatakform.colleges, tatakform.student.course_id)?.name }}</span>
      </div>
      <div class="card clickable" role="button">
        <md-ripple />
        <h4>Change Password</h4>
        <md-icon v-html="icon('keyboard_arrow_right')" />
      </div>

      <div class="flex justify-end">
        <md-filled-button @click="logout">
          <span>Logout</span>
        </md-filled-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import "@material/web/icon/icon";
import "@material/web/ripple/ripple";
import "@material/web/button/filled-button";

import { icon } from "~/utils/icon";
import { onMounted } from "vue";
import { toast } from "vue3-toastify";
import { useRouter } from "vue-router";
import { useStore, useTatakform, useDialog } from "~/store";
import { Endpoints, makeRequest } from "~/network/request";
import { getCollegeFromCourseID, getCourseFromCourseID } from "~/utils/page";
import { removeStore } from "~/utils/storage";

const store = useStore();
const tatakform = useTatakform();
const dialog = useDialog();
const router = useRouter();

onMounted(() => {
  fetchConfig();
});

function fetchConfig() {
  store.isLoading = true;

  makeRequest<{ colleges: CollegeModel[] }, null>("GET", Endpoints.TatakformsConfig, null, response => {
    store.isLoading = false;

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    tatakform.colleges = response.data.colleges;
  });
}

function logout() {
  const id = dialog.open({
    title: "Logout confirmation",
    message: "This will clear your session data. Are you sure you want to logout?",
    ok: {
      text: "Logout",
      click() {
        removeStore("usat");
        removeStore("usrt");
        dialog.close(id);
        router.push({ path: "/tatakforms/login" });
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

<style lang="scss" scoped>

.dp {
  --md-icon-size: 100px;
  @apply text-outline-variant;
}

.name {
  @apply text-2xl font-bold text-on-surface-variant mt-2;
}

.sub {
  @apply text-outline;
}

.card:not(.clickable) {
  @apply cursor-not-allowed;
}

.card {
  @apply bg-surface-container p-6 rounded-lg flex justify-between items-center gap-5 w-full relative;

  h4 {
    @apply font-medium;
  }
}
</style>