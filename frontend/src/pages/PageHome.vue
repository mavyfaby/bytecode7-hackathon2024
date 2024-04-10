<template>
  <div>
    <div v-if="store.isLoggedIn" class="flex flex-col mt-8">
      <h3 class="text-2xl font-bold">Announcements</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mt-5">
        <VAnnouncement
          v-for="announcement in dummyAnnouncements"
          :key="announcement.id"
          :data="announcement"
        />
      </div>

      <h3 class="text-2xl font-bold mt-5">Calendar</h3>
      
      <div class="flex flex-col-reverse md:flex-col 2xl:grid 2xl:grid-cols-6 gap-16 justify-center my-6">
        <div class="hidden md:block col-span-4 rounded-xl shadow-lg dark:shadow-surface-container">
          <Calendar
            ref="c1"
            @did-move="($event: Event) => onChange($event, 1)"
            class="custom-calendar w-full"
            :masks="{ weekdays: 'WWW' }"
            :attributes="attributes"
            :is-dark="store.isDark"
            disable-page-swipe
            color="purple"
          >
            <template v-slot:day-content="{ day, attributes }">
              <div class="flex flex-col h-full z-10 overflow-hidden">
                <span class="day-label body-large font-medium text-secondary p-1.5">{{ day.day }}</span>
                <div class="flex-grow overflow-y-auto overflow-x-auto">
                  <p
                    v-for="attr in attributes"
                    :key="attr.key"
                    class="text-xs leading-tight rounded-sm p-1 mt-0 mb-1"
                    :class="attr.customData?.class"
                  >
                    {{ attr?.customData?.title }}
                  </p>
                </div>
              </div>
            </template>
          </Calendar>
        </div>

        <div class="w-full flex-grow col-span-2 px-4">
          <Transition name="slide-fade" mode="out-in">
            <div v-if="isLoading" class="flex flex-col justify-center items-center gap-3 body-medium">
              <md-linear-progress indeterminate />
              <span>Fetching events and activities...</span>
            </div>
            <div v-else>
              <h3 class="mb-8 title-large font-semibold text-left -translate-x-3 text-secondary flex items-center">
                <md-icon class="mr-2">event</md-icon>
                {{ monthYear }}
              </h3>

              <VTimeline v-if="timelineData.length > 0" :data="timelineData" />
              <div class="text-on-surface-variant font-medium" v-else>
                No appointments found for this month.
              </div>
              <div class="my-8" />
            </div>
          </Transition>
        </div>

        <div class="md:hidden flex justify-center">
          <Calendar
            ref="c2"
            @did-move="($event: Event) => onChange($event, 2)"
            class="w-full"
            :attributes="attributes"
            :is-dark="store.isDark"
            disable-page-swipe
            color="purple"
          />
        </div>
      </div>

    </div>
    <section v-else class="grid grid-cols-1 lg:grid-cols-2 items-center gap-32 lg:gap-0 lg:h-[calc(100dvh_-_64px)]">
      <div class="mt-16 lg:mt-0">
        <h1 class="text-6xl font-bold text-primary mb-3">Name</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        <div class="flex gap-2 mt-5">
          <router-link to="/login">
            <md-outlined-button>Login</md-outlined-button>
          </router-link>
          <router-link to="/signup">
            <md-filled-button>Register</md-filled-button>
          </router-link>
        </div>
      </div>
      <div class="flex justify-center">
        Picture ni diri
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useStore } from '~/store';
import { Calendar } from 'v-calendar';
import { toast } from 'vue3-toastify';
import { getMonthName } from '~/utils/date';
import 'v-calendar/style.css';

import VAnnouncement from '~/components/VAnnouncement.vue';
import VTimeline from '~/components/VTimeline.vue';

const c1 = ref();
const c2 = ref();
const year = ref(new Date().getFullYear());
const month = ref(new Date().getMonth());
const monthYear = ref("");

const isLoading = ref(false);
const store = useStore();

const attributes = ref<any[]>([]);
const timelineData = ref<TimelineData[]>([]);
const dummyAnnouncements: AnnouncementModel[] = [
  {
    id: 1,
    title: 'Announcement 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date_stamp: '2024-01-01 00:00',
  },
  {
    id: 1,
    title: 'Announcement 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date_stamp: '2024-01-01 00:00',
  },
  {
    id: 1,
    title: 'Announcement 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date_stamp: '2024-01-01 00:00',
  },
  {
    id: 1,
    title: 'Announcement 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date_stamp: '2024-01-01 00:00',
  },
  {
    id: 1,
    title: 'Announcement 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date_stamp: '2024-01-01 00:00',
  },
  {
    id: 1,
    title: 'Announcement 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date_stamp: '2024-01-01 00:00',
  },
  {
    id: 1,
    title: 'Announcement 1',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    date_stamp: '2024-01-01 00:00',
  },
];

onMounted(() => {
  fetchEvents(getYearMonth(year.value, month.value + 1));
  monthYear.value = getMonthName(month.value + 1, false) + " " + year.value;
});

/**
 * Fetch events from the server
 */
function fetchEvents(search = "") {

}

// For AND circuit search condition 
let x: number, y: number;

/**
 * On date change
 */
 function onChange(e: any, c: number) {
  if (!c1.value || !c2.value) {
    return;
  }

  if (e.length === 0) {
    toast.error("Can't get date. Please try again. :(");
    return;
  }

  if (c === 1) {
    c2.value.move({ year: e[0].year, month: e[0].month });
    x = 1;
  }
  
  if (c === 2) {
    c1.value.move({ year: e[0].year, month: e[0].month });
    y = 1;
  }
  
  if (x > 0 && y > 0) {
    fetchEvents(getYearMonth(e[0].year, e[0].month));
    x = 0;
    y = 0;
  }

  monthYear.value = e[0].title;
}

/**
 * Get year and month 
 */
 function getYearMonth(year: number, month: number) {
  return year + "-" + (month < 10 ? "0" + month : month);
}
</script>

<style lang="scss">
.custom-calendar.vc-container {
  --day-width: 90px;
  --day-height: 90px;

  border-radius: 12px;
  width: 100%;

  *::-webkit-scrollbar {
    width: 0px !important;
  }

  .vc-dots {
    @apply hidden;
  }

  & .vc-highlight-bg-solid, & .vc-highlight-bg-light {
    @apply bg-transparent;
  }
 
  & .vc-header {
    @apply h-16 bg-surface-container mt-0 rounded-tl-xl rounded-tr-xl;

    .vc-title, .vc-title:hover {
      @apply text-on-surface opacity-[0.9];
    }
  }

  & .vc-weeks {
    padding: 0;
  }

  & .vc-weekday {
    @apply bg-surface-container border-t border-b border-outline-variant py-2 text-on-surface-variant;
  }

  & .vc-day {
    @apply bg-surface-container;

    padding: 0 5px 3px 5px;
    text-align: left;
    height: var(--day-height);
    min-width: var(--day-width);

    &.weekday-1,
    &.weekday-7 {
      @apply bg-surface-container-high;
    }

    &.weekday-1 {
      @apply rounded-bl-lg;;
    }
    
    &.weekday-7 {
      @apply rounded-br-lg;;
    }

    &:not(.on-bottom) {
      @apply border-outline-variant border-b;;
    }

    &:not(.on-right) {
      @apply border-outline-variant border-r;
    }
  }
  
  .vc-week:last-child .vc-day {
    @apply border-b-0;
  }

  & .vc-day-dots {
    margin-bottom: 5px;
  }
}

.vc-light {
  --vc-border: transparent;;
  --vc-bg: var(--md-sys-color-surface-container);
}

.vc-dark {
  --vc-border: transparent;
  --vc-bg: var(--md-sys-color-surface-container);
  --vc-color: var(--md-sys-color-on-surface);
  --vc-popover-content-bg: var(--md-sys-color-surface-variant);
  --vc-day-content-disabled-color: var(--md-sys-color-surface-variant);
  
  &.vc-popover-content {
    border: none;
  }
}

.vc-purple {
  --vc-accent-900: #56216b;
  --vc-accent-800: #58236d;
  --vc-accent-700: #652f7a;
  --vc-accent-600: #723c87;
  --vc-accent-500: #7f4894;
  --vc-accent-400: #9a61ae;
  --vc-accent-300: #b67aca;
  --vc-accent-200: #d294e7;
  --vc-accent-100: #edb1ff;
  --vc-accent-50: #f5ccff;
}
</style>