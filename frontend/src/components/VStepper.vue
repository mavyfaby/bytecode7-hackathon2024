<template>
  <div>
    <ol class="flex items-center w-full text-sm font-medium text-center sm:text-base">
      <li
        v-for="(step, i) in items"
        :key="step"
        :class="i < items.length - 1 ? 'with-line' : ''"
      >
        <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 text-on-surface-variant whitespace-nowrap">
          <md-icon v-if="i === activeIndex" class="mr-2 text-primary" filled>verified</md-icon>
          <md-icon v-else class="mr-2 text-primary">verified</md-icon>
          {{ step }}
        </span>
      </li>
    </ol>
  </div>
</template>

<script lang="ts" setup>
withDefaults(defineProps<{
  items: string[],
  activeIndex: number;
}>(), {
  activeIndex: 0
});
</script>

<style lang="scss" scoped>
.with-line {
  @apply flex md:w-full items-center text-primary sm:after:content-[''] after:w-full after:h-1 after:border-b
    after:border-outline-variant after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10;
}
</style>